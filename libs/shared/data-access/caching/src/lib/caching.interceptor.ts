import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse,
} from "@angular/common/http";
import { Injectable, InjectionToken, inject } from "@angular/core";

import { tap, of, Observable } from "rxjs";
import { CacheService } from "./cache.service";

export const SEARCH_URL = new InjectionToken<string>("SEARCH_URL");

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
	private cacheService: CacheService = inject(CacheService);
	private searchUrl: string | null = inject(SEARCH_URL, {
		optional: true,
	});

	intercept(request: HttpRequest<unknown>, next: HttpHandler) {
		if (!isCacheable(request, this.searchUrl)) {
			return next.handle(request);
		}

		const cachedResponse = this.cacheService.get(request);

		return cachedResponse
			? of(cachedResponse)
			: sendRequestAndCache(request, next, this.cacheService);
	}
}

function isCacheable(
	req: HttpRequest<unknown>,
	searchUrl?: string | null,
): boolean {
	return searchUrl
		? req.method === "GET" && -1 < req.url.indexOf(searchUrl)
		: req.method === "GET";
}

function sendRequestAndCache(
	req: HttpRequest<unknown>,
	next: HttpHandler,
	cacheService: CacheService,
): Observable<HttpEvent<unknown>> {
	return next.handle(req).pipe(
		tap(event => {
			if (event instanceof HttpResponse) {
				cacheService.put(req, event);
			}
		}),
	);
}
