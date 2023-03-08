import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipeModule } from "@ban/web/shared/pipes/translate";

import { PaymentListItemComponent } from "./payment-list-item.component";

@NgModule({
	imports: [CommonModule, TranslatePipeModule],
	declarations: [PaymentListItemComponent],
})
export class PaymentListItemModule {}
