import { Routes } from "@angular/router";

export const paymentsRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/payments/feature/list")).PaymentsListModule,
	},
];
