import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import {
	ListControllerService,
	listControllerFactory,
} from "@ban/shared/data-access/list-controller";
import { ListComponent } from "@ban/shared/ui/list";
import { ListItemTemplateDirective } from "@ban/shared/ui/list-item-template";
import { User, UserService } from "@ban/users/data-access";
import { UserListItemComponent } from "@ban/users/ui/list-item";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {
	CachingInterceptor,
	SEARCH_URL,
} from "@ban/shared/data-access/caching";

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
	imports: [
		CommonModule,
		HttpClientModule,
		ListComponent,
		UserListItemComponent,
		ListItemTemplateDirective,
	],
	template: `
		<ban-list
			class="ban-user-list__list"
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
				let-user
			>
				<ban-user-list-item
					[user]="user"
					[itemSize]="itemSize"
				/>
			</ng-template>
		</ban-list>
	`,
	styleUrls: ["./user-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: SEARCH_URL, useValue: "start" }, // could be more specific but we're only using it in Users
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CachingInterceptor,
			multi: true,
		},
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
	standalone: true,
})
export class UserListComponent {
	readonly itemSize = USER_ITEM_SIZE;

	readonly title = TITLE;

	listController: ListControllerService<User> = inject(
		ListControllerService<User>,
	);
}
