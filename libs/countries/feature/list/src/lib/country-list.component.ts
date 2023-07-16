import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import { Country, CountryService } from "@ban/countries/data-access";
import { CountryListItemComponent } from "@ban/countries/ui/list-item";
import {
	ListControllerService,
	listControllerFactory,
} from "@ban/shared/data-access/list-controller";
import { ListComponent } from "@ban/shared/ui/list";
import { ListItemTemplateDirective } from "@ban/shared/ui/list-item-template";

const COUNTRY_ITEM_SIZE = 60;
const SEARCH_FIELD = "name";
const TITLE = "Manage Countries";

function offlineSearchFilter(
	item: Country,
	searchField: keyof Country,
	search = "",
): boolean {
	if (!search.length) {
		return true;
	}

	const itemField = item[searchField];

	if (typeof itemField === "string") {
		return itemField.toLowerCase().indexOf(search) > -1;
	}

	if (typeof itemField === "number") {
		return itemField === +search;
	}

	return false;
}

@Component({
	selector: "ban-country-list",
	host: { class: "ban-country-list" },
	imports: [
		CommonModule,
		ListComponent,
		CountryListItemComponent,
		ListItemTemplateDirective,
	],
	template: `
		<ban-list
			class="ban-country-list__list"
			showSearch
			[itemSize]="itemSize"
			[title]="title"
			[reachedEnd]="listController.reachedEnd"
			[items]="listController.displayedItems$ | async"
			(offsetChange)="listController.onOffsetChange($event)"
			(searchTermChange)="this.listController.searchTerm$.next($event)"
		>
			<ng-template
				banListItem
				let-country
			>
				<ban-country-list-item
					[country]="country"
					[itemSize]="itemSize"
				/>
			</ng-template>
		</ban-list>
	`,
	styleUrls: ["./country-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		CountryService,
		{
			provide: ListControllerService<Country>,
			useFactory: listControllerFactory(
				SEARCH_FIELD,
				offlineSearchFilter,
			),
			deps: [CountryService],
		},
	],
	standalone: true,
})
export class CountryListComponent {
	readonly itemSize = COUNTRY_ITEM_SIZE;

	readonly title = TITLE;

	listController: ListControllerService<Country> = inject(
		ListControllerService<Country>,
	);
}
