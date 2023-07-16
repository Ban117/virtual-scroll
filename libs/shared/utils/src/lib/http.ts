import { HttpResponse } from "@angular/common/http";
import { BodyWithTotal, Entity } from "@ban/shared/data-access/models";

export function extractBodyAndTotal<T extends Entity>(
	response: HttpResponse<T[]>,
): BodyWithTotal<T> {
	const totalCount = response.headers
		? response.headers.get("X-Total-Count") ?? 0
		: 0;

	return {
		body: response.body ?? [],
		total: +totalCount,
	};
}
