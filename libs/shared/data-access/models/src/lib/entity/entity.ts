/* eslint-disable @nx/enforce-module-boundaries */
import { InjectionToken, Provider, Type } from "@angular/core";
import { Country } from "@ban/countries/data-access";
import { Payment } from "@ban/payments/data-access";
import {
	ListControllerConfig,
	OfflineSearchFilter,
} from "@ban/shared/data-access/list-controller";
import { User } from "@ban/users/data-access";
import { Observable } from "rxjs";

export interface Entity {
	id: string;
}

const TOKENS = {
	COUNTRY_ENTITY_SERVICE_TOKEN: new InjectionToken<EntityService<Country>>(
		"COUNTRY_ENTITY_SERVICE_TOKEN",
	),
	PAYMENT_ENTITY_SERVICE_TOKEN: new InjectionToken<EntityService<Payment>>(
		"PAYMENT_ENTITY_SERVICE_TOKEN",
	),
	USER_ENTITY_SERVICE_TOKEN: new InjectionToken<EntityService<User>>(
		"USER_ENTITY_SERVICE_TOKEN",
	),
} as const;

export function createListControllerProviders<TEntity extends Entity>(
	clazz: Type<EntityService<TEntity>>,
	searchField: keyof TEntity,
	offlineSearchFilter: OfflineSearchFilter<TEntity>,
	entityServiceToken: InjectionToken<TEntity>,
): Provider[] {
	return [
		{
			provide: entityServiceToken,
			useClass: clazz,
		},
		{
			provide: ListControllerConfig<TEntity>,
			useValue: {
				searchField,
				offlineSearchFilter,
			},
		},
	];
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
