import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { ENTITY_SERVICE } from "@ban/web/shared/data-access/models";
import { ListControllerBase } from "@ban/web/shared/ui/list-controller";
import { User, UserService } from "@ban/web/users/data-access";

const USER_ITEM_SIZE = 90;
const SEARCH_FIELD = "firstName";
const TITLE = "Manage Users";

@Component({
	selector: "ban-user-list",
	host: { class: "ban-user-list" },
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ENTITY_SERVICE,
			useClass: UserService,
		},
	],
})
export class UserListComponent extends ListControllerBase<User> {
	itemSize = USER_ITEM_SIZE;

	searchField: keyof User = SEARCH_FIELD;

	readonly title = TITLE;
	offlineSearchFilter(item: User, search = ""): boolean {
		if (!search.length) {
			return true;
		}

		const itemField = item[this.searchField];

		if (typeof itemField === "string") {
			return itemField.toLowerCase().indexOf(search) > -1;
		}

		return false;
	}
}
