import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
	BodyWithTotal,
	EntityService,
} from "@ban/web/shared/data-access/models";
import { environment } from "@ban/web/shared/environments";
import { Observable, map } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { PaymentByStatus, Payment, PAYMENT_STATUS } from "../models";

@Injectable()
export class PaymentService implements EntityService<PaymentByStatus> {
	private readonly baseUrl = `http://localhost:${environment.jsonServerPort}/payments`;

	private readonly searchField = "status" as keyof PaymentByStatus;

	private readonly paymentStatus = PAYMENT_STATUS;

	private http: HttpClient = inject(HttpClient);

	getAllPayments$(): Observable<Payment[]> {
		return this.http.get<Payment[]>(this.baseUrl);
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
	): Observable<BodyWithTotal<PaymentByStatus>> {
		return this.getAllPayments$().pipe(
			map(payments => {
				const groupedByStatus = this.groupPaymentsByStatus(
					payments,
				).slice(start, end);

				return {
					body: groupedByStatus,
					total: groupedByStatus.length,
				};
			}),
		);
	}

	private groupPaymentsByStatus(payments: Payment[]): PaymentByStatus[] {
		return this.paymentStatus.map<PaymentByStatus>(status => {
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
