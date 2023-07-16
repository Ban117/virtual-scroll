import { ChangeDetectorRef, Pipe, PipeTransform, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TranslationService } from "@ban/shared/data-access/translations";
import { tap } from "rxjs";

@Pipe({
	name: "translate",
	pure: false,
	standalone: true,
})
export class TranslatePipe implements PipeTransform {
	private markForTransform = true;

	private value = "";

	private translationService: TranslationService = inject(TranslationService);

	private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	constructor() {
		this.translationService.onTranslationChange$
			.pipe(
				tap(() => {
					this.markForTransform = true;
					this.cdr.markForCheck();
				}),
				takeUntilDestroyed(),
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
}
