import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import { Country, CountryService } from "@ban/web/countries/data-access";
import {
	ListControllerService,
	listControllerFactory,
} from "@ban/web/shared/data-access/list-controller";

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
	templateUrl: "./country-list.component.html",
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
})
export class CountryListComponent {
	readonly itemSize = COUNTRY_ITEM_SIZE;

	readonly title = TITLE;

	listController: ListControllerService<Country> = inject(
		ListControllerService<Country>,
	);
}
