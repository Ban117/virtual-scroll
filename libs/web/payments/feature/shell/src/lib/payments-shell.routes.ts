import { Routes } from "@angular/router";
import { PaymentListComponent } from "@ban/web/payments/feature/list";

export const paymentsRoutes: Routes = [
	{
		path: "",
		component: PaymentListComponent,
	},
];
