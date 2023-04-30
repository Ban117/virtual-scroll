import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { Country, CountryService } from "@ban/web/countries/data-access";
import { ENTITY_SERVICE } from "@ban/web/shared/data-access/models";
import { ListControllerService } from "@ban/web/shared/ui/list-controller";

const COUNTRY_ITEM_SIZE = 60;
const SEARCH_FIELD = "name";
const TITLE = "Manage Countries";

@Component({
	selector: "ban-country-list",
	host: { class: "ban-country-list" },
	templateUrl: "./country-list.component.html",
	styleUrls: ["./country-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ENTITY_SERVICE,
			useClass: CountryService,
		},
		{
			provide: ListControllerService<Country>,
			useFactory: listControllerServiceFactory,
			deps: [ENTITY_SERVICE],
		},
	],
})
export class CountryListComponent {
	readonly itemSize = COUNTRY_ITEM_SIZE;

	readonly title = TITLE;

	constructor(public listController: ListControllerService<Country>) {}
}

// todo make generic and extract
function listControllerServiceFactory(
	entityService: CountryService,
): ListControllerService<Country> {
	return new ListControllerService(
		SEARCH_FIELD,
		offlineSearchFilter,
		entityService,
	);
}

// todo
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
