import { Routes } from "@angular/router";

export const usersRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/web/users/feature/list")).UserListModule,
	},
];
