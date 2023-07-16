import { Pipe, PipeTransform } from "@angular/core";
import { getFlagEmoji } from "@ban/shared/utils";

@Pipe({
	name: "flag",
})
export class FlagPipe implements PipeTransform {
	transform(countryCode: string): string {
		return getFlagEmoji(countryCode);
	}
}
