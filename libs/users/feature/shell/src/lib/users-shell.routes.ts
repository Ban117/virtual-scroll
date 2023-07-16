import { Routes } from "@angular/router";

export const usersRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/users/feature/list")).UserListModule,
	},
];
