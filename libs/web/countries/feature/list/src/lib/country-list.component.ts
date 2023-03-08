import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { Country, CountryService } from "@ban/web/countries/data-access";
import { ENTITY_SERVICE } from "@ban/web/shared/data-access/models";
import { ListControllerBase } from "@ban/web/shared/ui/list-controller";

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
	],
})
export class CountryListComponent extends ListControllerBase<Country> {
	itemSize = COUNTRY_ITEM_SIZE;

	searchField: keyof Country = SEARCH_FIELD;

	readonly title = TITLE;

	offlineSearchFilter(item: Country, search = ""): boolean {
		if (!search.length) {
			return true;
		}

		const itemField = item[this.searchField];

		if (typeof itemField === "string") {
			return itemField.toLowerCase().indexOf(search) > -1;
		}

		if (typeof itemField === "number") {
			return itemField === +search;
		}

		return false;
	}
}
