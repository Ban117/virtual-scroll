import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import { PaymentByStatus } from "@ban/payments/data-access";
import { TranslationService } from "@ban/shared/data-access/translations";
import { TranslatePipe } from "@ban/shared/pipes/translate";

@Component({
	selector: "ban-payment-list-item",
	host: { class: "ban-payment-list-item" },
	imports: [CommonModule, TranslatePipe],
	templateUrl: "./payment-list-item.component.html",
	styleUrls: ["./payment-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
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

	@Input({ required: true }) itemSize!: number;

	private _payment!: PaymentByStatus;
	private translationService: TranslationService = inject(TranslationService);
}
