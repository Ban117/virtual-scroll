import { Routes } from "@angular/router";

export const paymentsRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/web/payments/feature/list")).PaymentsListModule,
	},
];
