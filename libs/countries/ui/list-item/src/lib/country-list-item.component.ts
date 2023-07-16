import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	ViewEncapsulation,
} from "@angular/core";
import { Country } from "@ban/countries/data-access";

@Component({
	selector: "ban-country-list-item",
	host: { class: "ban-country-list-item" },
	templateUrl: "./country-list-item.component.html",
	styleUrls: ["./country-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListItemComponent {
	@HostBinding("style.height.px") get height() {
		return this.itemSize;
	}

	@Input() country!: Country;

	@Input() itemSize!: number;
}
