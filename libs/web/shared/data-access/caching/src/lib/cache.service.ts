import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface RequestCacheEntry {
	url: string;
	response: HttpResponse<unknown>;
	lastRead: number;
}

const maxAge = 300000;

@Injectable({
	providedIn: "root",
})
export class CacheService {
	private cache = new Map<string, RequestCacheEntry>();

	get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
		const url = req.urlWithParams;
		const cached = this.cache.get(url);

		if (!cached) {
			console.warn(
				"%c>>>> CacheService->get: cacheMiss",
				"color: Thistle",
				url,
			);
			return undefined;
		}

		console.warn(
			"%c>>>> CacheService->get: cacheHit",
			"color: Thistle",
			url,
			this.cache,
		);
		const isExpired = cached.lastRead < Date.now() - maxAge;

		return isExpired ? undefined : cached.response;
	}

	put(req: HttpRequest<unknown>, response: HttpResponse<unknown>) {
		const url = req.urlWithParams;

		const newEntry: RequestCacheEntry = {
			url,
			response,
			lastRead: Date.now(),
		};
		this.cache.set(url, newEntry);
		console.warn("%c>>>> CacheService->put", "color: Thistle", url);

		// remove expired cache entries
		const expired = Date.now() - maxAge;
		this.cache.forEach(entry => {
			if (entry.lastRead < expired) {
				console.warn(
					"%c>>>> CacheService->put: DELETE",
					"color: Thistle",
					entry.url,
				);
				this.cache.delete(entry.url);
			}
		});
	}
}
