import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { Subject, tap } from "rxjs";

interface Translation {
	[x: string]: string;
}

@Injectable({
	providedIn: "root",
})
export class TranslationService {
	readonly onTranslationChange$ = new Subject<void>();

	private translations: Translation = {};

	private httpClient: HttpClient = inject(HttpClient);

	constructor() {
		this.httpClient
			.get<Translation>("./assets/translations.json")
			.pipe(
				tap(data => {
					this.translations = data;
					this.onTranslationChange$.next();
				}),
				takeUntilDestroyed(),
			)
			.subscribe();
	}

	getTranslation(key: string): string {
		return this.translations[key] || key;
	}
}
