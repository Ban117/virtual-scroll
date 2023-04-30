import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	BodyWithTotal,
	EntityService,
} from "@ban/web/shared/data-access/models";
import { environment } from "@ban/web/shared/environments";
import { extractBodyAndTotal } from "@ban/web/shared/utils";
import { Observable, filter, map } from "rxjs";

import { Country } from "../models";

@Injectable()
export class CountryService implements EntityService<Country> {
	private http = inject(HttpClient);

	private readonly baseUrl = `http://localhost:${environment.jsonServerPort}/countries`;

	searchEntities$(
		term: string,
		field?: keyof Country,
	): Observable<Country[]> {
		if (field) {
			return this.http.get<Country[]>(
				`${this.baseUrl}?${field}_like=${term}`,
			);
		}

		return this.http.get<Country[]>(`${this.baseUrl}?q=${term}`);
	}

	getEntitiesByRange$(
		start: number,
		end: number,
	): Observable<BodyWithTotal<Country>> {
		return this.http
			.get<Country[]>(`${this.baseUrl}?_start=${start}&_end=${end}`, {
				observe: "response",
			})
			.pipe(
				filter(
					response =>
						response.body !== null && response.headers !== null,
				),
				map(response => extractBodyAndTotal(response)),
			);
	}
}
