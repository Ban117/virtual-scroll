import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ListModule } from "@ban/shared/ui/list";
import { UserListItemModule } from "@ban/users/ui/list-item";
import { ListItemTemplateModule } from "@ban/shared/ui/list-item-template";

import { UserListComponent } from "./user-list.component";

const routes: Routes = [
	{
		path: "",
		component: UserListComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ListModule,
		UserListItemModule,
		ListItemTemplateModule,
	],
	declarations: [UserListComponent],
})
export class UserListModule {}
