import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { AnimationOptions } from "ngx-lottie";

@Component({
	selector: "ban-not-found",
	host: { class: "ban-not-found" },
	templateUrl: "./not-found.component.html",
	styleUrls: ["./not-found.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
	options: AnimationOptions = {
		path: "/assets/not-found/coffee-spilling.json",
	};
}
