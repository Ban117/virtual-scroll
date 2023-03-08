import { Entity } from "@ban/web/shared/data-access/models";

// todo consider replacing enum with type
export enum PaymentStatus {
	successful = "successful",
	delivery_error = "delivery_error",
	wrong_payslip = "wrong_payslip",
	wrong_address = "wrong_address",
	declined = "declined",
}

export type PaymentStatusType = keyof typeof PaymentStatus;

export interface Payment extends Entity {
	status: PaymentStatusType;
	receiver: string;
	internalFieldA: string;
	xYZRandomField: string;
}

export interface PaymentByStatus extends Entity {
	status: PaymentStatusType;
	payments: Payment[];
	count: number;
}
