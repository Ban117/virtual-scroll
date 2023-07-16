import { Entity } from "@ban/shared/data-access/models";
import { ExtractTypeFromReadonlyArray } from "@ban/shared/utils";

// TS enum replacement, similar to using a pojo with `as const` but wanted to
// keep this as an array/iterable
export const PAYMENT_STATUS = [
	"successful",
	"delivery_error",
	"wrong_payslip",
	"wrong_address",
	"declined",
] as const;

export type PaymentStatus = ExtractTypeFromReadonlyArray<typeof PAYMENT_STATUS>;

export interface Payment extends Entity {
	status: PaymentStatus;
	receiver: string;
	internalFieldA: string;
	xYZRandomField: string;
}

export interface PaymentByStatus extends Entity {
	status: PaymentStatus;
	payments: Payment[];
	count: number;
}
