import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	BodyWithTotal,
	EntityService,
} from "@ban/web/shared/data-access/models";
import { environment } from "@ban/web/shared/environments";
import { extractBodyAndTotal } from "@ban/web/shared/utils";
import { Observable, filter, map } from "rxjs";

import { User } from "../models";

@Injectable()
export class UserService implements EntityService<User> {
	private readonly baseUrl = `http://localhost:${environment.jsonServerPort}/users`;

	constructor(private http: HttpClient) {}

	getAllUsers$(): Observable<User[]> {
		return this.http.get<User[]>(this.baseUrl);
	}

	getUsersByPage$(page: number, limit: number): Observable<User[]> {
		return this.http.get<User[]>(
			`${this.baseUrl}?_page=${page}&_limit=${limit}`,
		);
	}

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
