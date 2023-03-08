import { HttpResponse } from "@angular/common/http";

export function extractBodyAndTotal<T>(
	response: HttpResponse<T[]>,
): [T[], number] {
	const totalCount = response.headers
		? response.headers.get("X-Total-Count") ?? 0
		: 0;

	return [response.body ?? [], +totalCount];
}
