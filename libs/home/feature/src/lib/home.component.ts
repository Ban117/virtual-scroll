import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "ban-home",
	host: { class: "ban-home" },
	imports: [CommonModule],
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class HomeComponent {}
