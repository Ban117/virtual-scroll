import { Routes } from "@angular/router";
import { LayoutComponent } from "@ban/shell/ui/layout";

export const appRoutes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{
				path: "",
				redirectTo: "home",
				pathMatch: "full",
			},
			{
				path: "home",
				loadComponent: async () =>
					(await import("@ban/home/feature")).HomeComponent,
			},
			{
				path: "users",
				loadComponent: async () =>
					(await import("@ban/users/feature/list")).UserListComponent,
			},
			{
				path: "countries",
				loadComponent: async () =>
					(await import("@ban/countries/feature/list"))
						.CountryListComponent,
			},
			{
				path: "payments",
				loadComponent: async () =>
					(await import("@ban/payments/feature/list"))
						.PaymentListComponent,
			},
			{
				path: "404",
				loadComponent: async () =>
					(await import("@ban/not-found/feature")).NotFoundComponent,
			},
			{
				path: "**",
				redirectTo: "404",
			},
		],
	},
];
