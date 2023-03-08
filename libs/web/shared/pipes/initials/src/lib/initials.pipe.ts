import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "initials",
})
export class InitialsPipe implements PipeTransform {
	transform(firstName: string, lastName: string): string {
		return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
	}
}
