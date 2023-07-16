import { Observable } from "rxjs";

export interface Entity {
	id: string;
}

export interface EntityService<T> {
	getEntitiesByRange$(
		start: number,
		end: number,
	): Observable<BodyWithTotal<T>>;
	searchEntities$(term: string, field?: keyof T): Observable<T[]>;
}

export type BodyWithTotal<T> = {
	body: T[];
	total: number;
};
