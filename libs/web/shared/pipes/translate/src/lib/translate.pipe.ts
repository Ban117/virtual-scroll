import {
	ChangeDetectorRef,
	OnDestroy,
	Pipe,
	PipeTransform,
	inject,
} from "@angular/core";
import { TranslationService } from "@ban/web/shared/data-access/translations";
import { Subject, takeUntil, tap } from "rxjs";

@Pipe({
	name: "translate",
	pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
	private markForTransform = true;

	private value = "";

	private translationService: TranslationService = inject(TranslationService);

	private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	private readonly _destroy$ = new Subject<void>();

	constructor() {
		this.translationService.onTranslationChange$
			.pipe(
				tap(() => {
					this.markForTransform = true;
					this.cdr.markForCheck();
				}),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}

	transform(key: string): string {
		if (!this.markForTransform) {
			return this.value;
		}

		this.value = this.translationService.getTranslation(key);
		this.markForTransform = false;
		return this.value;
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
