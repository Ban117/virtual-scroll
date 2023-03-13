import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListModule } from "@ban/web/shared/ui/list";
import { UserListItemModule } from "@ban/web/users/ui/list-item";
import { ListItemTemplateModule } from "@ban/web/shared/ui/list-item-template";

import { UserListComponent } from "./user-list.component";

@NgModule({
	imports: [
		CommonModule,
		ListModule,
		UserListItemModule,
		ListItemTemplateModule,
	],
	declarations: [UserListComponent],
})
export class UserListModule {}
