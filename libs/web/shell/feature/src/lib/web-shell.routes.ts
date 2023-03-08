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
		],
	},
];
