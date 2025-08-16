import { Directive, inject } from "@angular/core";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
	ENTITY_SERVICE_TOKEN,
	Entity,
	EntityService,
} from "@ban/shared/data-access/models";
import {
	Subject,
	BehaviorSubject,
	Observable,
	filter,
	mergeMap,
	scan,
	map,
	tap,
	combineLatest,
	distinctUntilChanged,
	switchMap,
	of,
	share,
} from "rxjs";

export type OfflineSearchFilter<TItem extends Entity> = (
	item: TItem,
	searchField: keyof TItem,
	search: string,
) => boolean;

export abstract class ListControllerConfig<TItem extends Entity> {
	abstract searchField: keyof TItem;
	abstract offlineSearchFilter: OfflineSearchFilter<TItem>;
}

@Directive({
	standalone: true,
})
export class ListControllerDirective<TItem extends Entity> {
	private config = inject(ListControllerConfig<TItem>);

	private entityService: EntityService<TItem> = inject(ENTITY_SERVICE_TOKEN);

	reachedEnd = false;

	searchTerm$ = new BehaviorSubject<string>("");

	private totalItems: number | undefined;

	private batchSize = 50;

	private offset$ = new Subject<number>();

	private storedItems$ = this.offset$.pipe(
		distinctUntilChanged(),
		filter(() => this.searchTermEmpty),
		mergeMap(offset => this.getBatch$(offset)),
		scan((acc, batch) => {
			return { ...acc, ...batch };
		}, {} as Record<string, TItem>),
		map(v => Object.values(v)),
		tap(storedItems => {
			if (this.totalItems && storedItems.length >= this.totalItems) {
				this.reachedEnd = true;
			}
		}),
	);

	displayedItems$ = combineLatest([
		this.storedItems$,
		this.searchTerm$.pipe(distinctUntilChanged()),
	]).pipe(
		switchMap(([storedItems, searchTerm]) => {
			if (!searchTerm) {
				return of(storedItems);
			}

			if (this.reachedEnd) {
				return of(
					storedItems.filter(item =>
						this.config.offlineSearchFilter(
							item,
							this.config.searchField,
							searchTerm,
						),
					),
				);
			}
			return this.entityService.searchEntities$(
				searchTerm,
				this.config.searchField,
			);
		}),
		share(), // needed if we use the `ListItemTemplateDirective`
	);

	private get searchTermEmpty(): boolean {
		return this.searchTerm$.value === "";
	}

	constructor() {
		if (!this.entityService) {
			throw new Error("Must provide ENTITY_SERVICE!");
		}

		if (!this.config.offlineSearchFilter || !this.config.searchField) {
			throw new Error("Must provide config!");
		}
	}

	onOffsetChange(offest: number) {
		this.offset$.next(offest);
	}

	getBatch$(offset: number): Observable<Record<string, TItem>> {
		return this.entityService
			.getEntitiesByRange$(offset, offset + this.batchSize)
			.pipe(
				tap(x => (this.totalItems = x.total)),
				map(x =>
					x.body.reduce((acc, curr) => {
						const id = curr.id;
						return { ...acc, [id]: curr };
					}, {}),
				),
			);
	}
}
