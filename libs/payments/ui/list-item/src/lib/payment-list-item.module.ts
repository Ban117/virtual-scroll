import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipeModule } from "@ban/shared/pipes/translate";

import { PaymentListItemComponent } from "./payment-list-item.component";

@NgModule({
	imports: [CommonModule, TranslatePipeModule],
	declarations: [PaymentListItemComponent],
	exports: [PaymentListItemComponent],
})
export class PaymentListItemModule {}
