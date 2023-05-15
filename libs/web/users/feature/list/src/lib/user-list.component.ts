import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import {
	ListControllerService,
	listControllerFactory,
} from "@ban/web/shared/data-access/list-controller";
import { User, UserService } from "@ban/web/users/data-access";

const USER_ITEM_SIZE = 90;
const SEARCH_FIELD = "firstName";
const TITLE = "Manage Users";

function offlineSearchFilter(
	item: User,
	searchField: keyof User,
	search = "",
): boolean {
	if (!search.length) {
		return true;
	}

	const itemField = item[searchField];

	if (typeof itemField === "string") {
		return itemField.toLowerCase().indexOf(search) > -1;
	}

	return false;
}

@Component({
	selector: "ban-user-list",
	host: { class: "ban-user-list" },
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		UserService,
		{
			provide: ListControllerService<User>,
			useFactory: listControllerFactory(
				SEARCH_FIELD,
				offlineSearchFilter,
			),
			deps: [UserService],
		},
	],
})
export class UserListComponent {
	readonly itemSize = USER_ITEM_SIZE;

	readonly title = TITLE;

	listController: ListControllerService<User> = inject(
		ListControllerService<User>,
	);
}
