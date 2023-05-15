import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import { PaymentByStatus, PaymentService } from "@ban/web/payments/data-access";
import { TranslationService } from "@ban/web/shared/data-access/translations";
import {
	ListControllerService,
	listControllerFactory,
} from "@ban/web/shared/data-access/list-controller";
import { Subject, tap, takeUntil } from "rxjs";

const PAYMENT_ITEM_SIZE = 60;
const SEARCH_FIELD = "status";
const TITLE = "Manage Payments";

function offlineSearchFilter(
	item: PaymentByStatus,
	searchField: keyof PaymentByStatus,
	search = "",
): boolean {
	if (!search.length) {
		return true;
	}

	const itemField = item[searchField];

	if (typeof itemField === "string") {
		return itemField.toLowerCase().indexOf(search) > -1;
	}

	if (typeof itemField === "number") {
		return itemField === +search;
	}

	throw new Error("Implement offline filtering for nested objects");
}

@Component({
	selector: "ban-payment-list",
	host: { class: "ban-payment-list" },
	templateUrl: "./payment-list.component.html",
	styleUrls: ["./payment-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		PaymentService,
		{
			provide: ListControllerService<PaymentByStatus>,
			useFactory: listControllerFactory(
				SEARCH_FIELD,
				offlineSearchFilter,
			),
			deps: [PaymentService],
		},
	],
})
export class PaymentListComponent implements OnInit, OnDestroy {
	readonly itemSize = PAYMENT_ITEM_SIZE;

	readonly title = TITLE;

	private readonly _destroy$ = new Subject<void>();

	private translationService: TranslationService = inject(TranslationService);

	listController: ListControllerService<PaymentByStatus> = inject(
		ListControllerService<PaymentByStatus>,
	);

	ngOnInit() {
		// we have to trigger this on data change if using the template as it's being
		// recycled by `cdkVirtualFor` and there is no @Input reference change
		this.listController.displayedItems$
			.pipe(
				tap(() => this.translationService.onTranslationChange$.next()),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
