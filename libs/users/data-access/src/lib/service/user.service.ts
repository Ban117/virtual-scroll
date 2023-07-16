import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BodyWithTotal, EntityService } from "@ban/shared/data-access/models";
import { environment } from "@ban/shared/environments";
import { extractBodyAndTotal } from "@ban/shared/utils";
import { Observable, filter, map } from "rxjs";

import { User } from "../models";

@Injectable()
export class UserService implements EntityService<User> {
	private readonly baseUrl = `http://localhost:${environment.jsonServerPort}/users`;

	private http: HttpClient = inject(HttpClient);

	searchEntities$(term: string, field?: keyof User): Observable<User[]> {
		if (field) {
			return this.http.get<User[]>(
				`${this.baseUrl}?${field}_like=${term}`,
			);
		}

		return this.http.get<User[]>(`${this.baseUrl}?q=${term}`);
	}

	getEntitiesByRange$(
		start: number,
		end: number,
	): Observable<BodyWithTotal<User>> {
		return this.http
			.get<User[]>(`${this.baseUrl}?_start=${start}&_end=${end}`, {
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
