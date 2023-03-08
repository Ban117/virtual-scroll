import { Routes } from "@angular/router";
import { UserListComponent } from "@ban/web/users/feature/list";

export const usersRoutes: Routes = [
	{
		path: "",
		component: UserListComponent,
	},
];
