import { Directive, OnInit, Inject, Optional } from "@angular/core";
import {
	Entity,
	EntityService,
	ENTITY_SERVICE,
} from "@ban/web/shared/data-access/models";
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

@Directive()
export abstract class ListControllerBase<TItem extends Entity>
	implements OnInit
{
	abstract itemSize: number;

	abstract searchField: keyof TItem;

	reachedEnd = false;

	offset$ = new Subject<number>();

	searchTerm$ = new BehaviorSubject<string>("");

	protected displayedItems$!: Observable<TItem[]>;

	protected totalItems: number | undefined;

	protected batchSize = 50;

	protected storedItems$!: Observable<TItem[]>;

	protected get searchTermEmpty(): boolean {
		return this.searchTerm$.value === "";
	}

	constructor(
		@Optional() // only optional so we can throw our own error
		@Inject(ENTITY_SERVICE)
		private service: EntityService<TItem>,
	) {
		if (!this.service) {
			throw new Error("Subclass must provide ENTITY_SERVICE!");
		}
	}

	ngOnInit() {
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
							this.offlineSearchFilter(item, searchTerm),
						),
					);
				} else {
					return this.service.searchEntities$(
						searchTerm,
						this.searchField,
					);
				}
			}),
			share(), // needed if we use the `ListItemTemplateDirective`
		);
	}

	abstract offlineSearchFilter(item: TItem, search: string): boolean;

	protected onOffsetChange(offest: number) {
		this.offset$.next(offest);
	}

	protected getBatch$(offset: number): Observable<Record<string, TItem>> {
		return this.service
			.getEntitiesByRange$(offset, offset + this.batchSize)
			.pipe(
				tap(([, total]) => (this.totalItems = total)),
				map(([items]) => {
					return items.reduce((acc, curr) => {
						const id = curr.id;
						return { ...acc, [id]: curr };
					}, {});
				}),
			);
	}
}
