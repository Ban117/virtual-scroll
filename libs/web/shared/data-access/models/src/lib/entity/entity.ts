import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export interface Entity {
	id: string;
}

export interface EntityService<T> {
	getEntitiesByRange$(start: number, end: number): Observable<[T[], number]>;
	searchEntities$(term: string, field?: keyof T): Observable<T[]>;
}

export const ENTITY_SERVICE = new InjectionToken<EntityService<unknown>>(
	"@stibo-ben/entity-service",
);
