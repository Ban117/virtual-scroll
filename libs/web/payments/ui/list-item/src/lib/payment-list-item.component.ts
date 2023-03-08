import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	ViewEncapsulation,
} from "@angular/core";
import { PaymentByStatus } from "@ban/web/payments/data-access";
import { TranslationService } from "@ban/web/shared/data-access/translations";

@Component({
	selector: "ban-payment-list-item",
	host: { class: "ban-payment-list-item" },
	templateUrl: "./payment-list-item.component.html",
	styleUrls: ["./payment-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListItemComponent {
	@HostBinding("style.height.px") get height() {
		return this.itemSize;
	}

	@Input()
	get payment(): PaymentByStatus {
		return this._payment;
	}
	set payment(value: PaymentByStatus) {
		this._payment = value;
		// we have to trigger this on input binding change as the component is being
		// recycled by `cdkVirtualFor`
		this.translationService.onTranslationChange$.next();
	}

	@Input() itemSize!: number;

	private _payment!: PaymentByStatus;

	constructor(private translationService: TranslationService) {}
}
