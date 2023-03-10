import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { PaymentByStatus, PaymentService } from "@ban/web/payments/data-access";
import { ENTITY_SERVICE } from "@ban/web/shared/data-access/models";
import { TranslationService } from "@ban/web/shared/data-access/translations";
import { ListControllerBase } from "@ban/web/shared/ui/list-controller";
import { Subject, tap, takeUntil } from "rxjs";

const PAYMENT_ITEM_SIZE = 60;
const SEARCH_FIELD = "status";
const TITLE = "Manage Payments";

@Component({
	selector: "ban-payment-list",
	host: { class: "ban-payment-list" },
	templateUrl: "./payment-list.component.html",
	styleUrls: ["./payment-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ENTITY_SERVICE,
			useClass: PaymentService,
		},
	],
})
export class PaymentListComponent
	extends ListControllerBase<PaymentByStatus>
	implements OnInit, OnDestroy
{
	itemSize = PAYMENT_ITEM_SIZE;

	searchField: keyof PaymentByStatus = SEARCH_FIELD;

	readonly title = TITLE;

	private readonly _destroy$ = new Subject<void>();

	constructor(
		@Inject(ENTITY_SERVICE) service: PaymentService,
		private translationService: TranslationService,
	) {
		super(service);
	}

	override ngOnInit() {
		super.ngOnInit();

		// we have to trigger this on data change as the component is being
		// recycled by `cdkVirtualFor`
		this.displayedItems$
			.pipe(
				tap(() => this.translationService.onTranslationChange$.next()),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}

	offlineSearchFilter(item: PaymentByStatus, search = ""): boolean {
		if (!search.length) {
			return true;
		}

		const itemField = item[this.searchField];

		if (typeof itemField === "string") {
			return itemField.toLowerCase().indexOf(search) > -1;
		}

		if (typeof itemField === "number") {
			return itemField === +search;
		}

		throw new Error("Implement offline filtering for nested objects");
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
