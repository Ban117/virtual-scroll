import { Pipe, PipeTransform } from "@angular/core";
import { CALLING_CODE } from "./consts";

@Pipe({
	name: "callingCode",
})
export class CallingCodePipe implements PipeTransform {
	private codes = CALLING_CODE;

	transform(code: string): string {
		return this.codes.find(c => c.code === code)?.callingCode || "";
	}
}
