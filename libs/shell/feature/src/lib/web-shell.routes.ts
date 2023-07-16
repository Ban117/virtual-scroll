import { Routes } from "@angular/router";
import { LayoutComponent } from "@ban/shell/ui/layout";

export const webShellRoutes: Routes = [
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
				loadChildren: async () =>
					(await import("@ban/home/feature")).WebHomeModule,
			},
			{
				path: "users",
				loadChildren: async () =>
					(await import("@ban/users/feature/shell")).UsersShellModule,
			},
			{
				path: "countries",
				loadChildren: async () =>
					(await import("@ban/countries/feature/shell"))
						.CountriesShellModule,
			},
			{
				path: "payments",
				loadChildren: async () =>
					(await import("@ban/payments/feature/shell"))
						.PaymentsShellModule,
			},
			{
				path: "404",
				loadChildren: async () =>
					(await import("@ban/not-found/feature")).NotFoundModule,
			},
			{
				path: "**",
				redirectTo: "404",
			},
		],
	},
];
