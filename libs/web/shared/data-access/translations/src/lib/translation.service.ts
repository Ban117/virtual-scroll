import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";

interface Translation {
	[x: string]: string;
}

@Injectable({
	providedIn: "root",
})
export class TranslationService implements OnDestroy {
	readonly onTranslationChange$ = new Subject<void>();

	private translations: Translation = {};
	private readonly _destroy$ = new Subject<void>();

	constructor(private httpClient: HttpClient) {
		this.httpClient
			.get<Translation>("./assets/translations.json")
			.pipe(
				tap(data => {
					this.translations = data;
					this.onTranslationChange$.next();
				}),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}
	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	getTranslation(key: string): string {
		return this.translations[key] || key;
	}
}
