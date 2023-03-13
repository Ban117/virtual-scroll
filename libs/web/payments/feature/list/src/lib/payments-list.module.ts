import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListModule } from "@ban/web/shared/ui/list";
import { PaymentListItemModule } from "@ban/web/payments/ui/list-item";
import { ListItemTemplateModule } from "@ban/web/shared/ui/list-item-template";
import { TranslatePipeModule } from "@ban/web/shared/pipes/translate";

import { PaymentListComponent } from "./payment-list.component";

@NgModule({
	imports: [
		CommonModule,
		ListModule,
		PaymentListItemModule,
		ListItemTemplateModule,
		TranslatePipeModule,
	],
	declarations: [PaymentListComponent],
	exports: [PaymentListComponent],
})
export class WebPaymentsFeatureListModule {}
