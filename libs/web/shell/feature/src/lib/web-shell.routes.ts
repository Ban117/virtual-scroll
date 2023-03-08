import { Routes } from "@angular/router";
import { LayoutComponent } from "@ban/web/shell/ui/layout";

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
					(await import("@ban/web/home/feature")).WebHomeModule,
			},
			{
				path: "users",
				loadChildren: async () =>
					(await import("@ban/web/users/feature/shell"))
						.UsersShellModule,
			},
			{
				path: "countries",
				loadChildren: async () =>
					(await import("@ban/web/countries/feature/shell"))
						.CountriesShellModule,
			},
			{
				path: "payments",
				loadChildren: async () =>
					(await import("@ban/web/payments/feature/shell"))
						.PaymentsShellModule,
			},
		],
	},
];
