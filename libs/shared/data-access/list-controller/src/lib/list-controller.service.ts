import { Entity, EntityService } from "@ban/shared/data-access/models";
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

export function listControllerFactory<TItem extends Entity>(
	searchField: keyof TItem,
	offlineSearchFilter: OfflineSearchFilter<TItem>,
) {
	return (entityService: EntityService<TItem>) => {
		return new ListControllerService<TItem>(
			searchField,
			offlineSearchFilter,
			entityService,
		);
	};
}

export class ListControllerService<TItem extends Entity> {
	reachedEnd = false;

	searchTerm$ = new BehaviorSubject<string>("");

	displayedItems$!: Observable<TItem[]>;

	private totalItems: number | undefined;

	private batchSize = 50;

	private storedItems$!: Observable<TItem[]>;

	private get searchTermEmpty(): boolean {
		return this.searchTerm$.value === "";
	}

	private offset$ = new Subject<number>();

	constructor(
		private searchField: keyof TItem,
		private offlineSearchFilter: OfflineSearchFilter<TItem>,
		private entityService: EntityService<TItem>,
	) {
		if (!this.entityService) {
			throw new Error("Must provide ENTITY_SERVICE!");
		}

		this.storedItems$ = this.offset$.pipe(
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

		this.displayedItems$ = combineLatest([
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
							this.offlineSearchFilter(
								item,
								this.searchField,
								searchTerm,
							),
						),
					);
				} else {
					return this.entityService.searchEntities$(
						searchTerm,
						this.searchField,
					);
				}
			}),
			share(), // needed if we use the `ListItemTemplateDirective`
		);
	}

	onOffsetChange(offest: number) {
		this.offset$.next(offest);
	}

	getBatch$(offset: number): Observable<Record<string, TItem>> {
		return this.entityService
			.getEntitiesByRange$(offset, offset + this.batchSize)
			.pipe(
				tap(x => (this.totalItems = x.total)),
				map(x => {
					return x.body.reduce((acc, curr) => {
						const id = curr.id;
						return { ...acc, [id]: curr };
					}, {});
				}),
			);
	}
}
