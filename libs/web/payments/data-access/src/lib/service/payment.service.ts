import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityService } from "@ban/web/shared/data-access/models";
import { environment } from "@ban/web/shared/environments";
import { Observable, map } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { PaymentByStatus, Payment, PaymentStatus } from "../models";

@Injectable()
export class PaymentService implements EntityService<PaymentByStatus> {
	private readonly baseUrl = `http://localhost:${environment.jsonServerPort}/payments`;

	private readonly searchField = "status" as keyof PaymentByStatus;

	constructor(private http: HttpClient) {}

	getAllPayments$(): Observable<Payment[]> {
		return this.http.get<Payment[]>(this.baseUrl);
	}

	getPaymentsByPage$(page: number, limit: number): Observable<Payment[]> {
		return this.http.get<Payment[]>(
			`${this.baseUrl}?_page=${page}&_limit=${limit}`,
		);
	}

	searchEntities$(term: string): Observable<PaymentByStatus[]> {
		return this.getAllPayments$().pipe(
			map(payments => {
				let groupedByStatus = this.groupPaymentsByStatus(payments);

				groupedByStatus = groupedByStatus.filter(paymentGroup => {
					paymentGroup[this.searchField].toString().includes(term);
				});

				return groupedByStatus;
			}),
		);
	}

	getEntitiesByRange$(
		start: number,
		end: number,
	): Observable<[PaymentByStatus[], number]> {
		return this.getAllPayments$().pipe(
			map(payments => {
				const groupedByStatus = this.groupPaymentsByStatus(
					payments,
				).slice(start, end);

				return [groupedByStatus, groupedByStatus.length];
			}),
		);
	}

	private groupPaymentsByStatus(payments: Payment[]): PaymentByStatus[] {
		const statuses = Object.values(PaymentStatus);

		return statuses.map<PaymentByStatus>(status => {
			const filteredPayments = payments.filter(
				payment => payment.status === status,
			);

			return {
				id: uuidv4(),
				status,
				payments: filteredPayments,
				count: filteredPayments.length,
			};
		});
	}
}
