import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { tap, of, Observable } from "rxjs";
import { CacheService } from "./cache.service";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
	constructor(private cacheService: CacheService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler) {
		console.warn("%c>>>> works?", "color: red");
		if (!isCacheable(request)) {
			return next.handle(request);
		}

		const cachedResponse = this.cacheService.get(request);

		return cachedResponse
			? of(cachedResponse)
			: sendRequestAndCache(request, next, this.cacheService);
	}
}

function isCacheable(req: HttpRequest<unknown>): boolean {
	// todo add url filtering
	return (
		req.method === "GET"
		// && -1 < req.url.indexOf(searchUrl)
	);
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
