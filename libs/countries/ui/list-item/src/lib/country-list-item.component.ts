import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	ViewEncapsulation,
} from "@angular/core";
import { Country } from "@ban/countries/data-access";
import { CallingCodePipe } from "@ban/shared/pipes/calling-code";
import { FlagPipe } from "@ban/shared/pipes/flag";

@Component({
	selector: "ban-country-list-item",
	host: { class: "ban-country-list-item" },
	imports: [CommonModule, FlagPipe, CallingCodePipe],
	templateUrl: "./country-list-item.component.html",
	styleUrls: ["./country-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class CountryListItemComponent {
	@HostBinding("style.height.px") get height() {
		return this.itemSize;
	}

	@Input() country!: Country;

	@Input() itemSize!: number;
}
