import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ListModule } from "@ban/shared/ui/list";
import { PaymentListItemModule } from "@ban/payments/ui/list-item";
import { ListItemTemplateModule } from "@ban/shared/ui/list-item-template";
import { TranslatePipeModule } from "@ban/shared/pipes/translate";

import { PaymentListComponent } from "./payment-list.component";

const routes: Routes = [
	{
		path: "",
		component: PaymentListComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ListModule,
		PaymentListItemModule,
		ListItemTemplateModule,
		TranslatePipeModule,
	],
	declarations: [PaymentListComponent],
	exports: [PaymentListComponent],
})
export class PaymentsListModule {}
