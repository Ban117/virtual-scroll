import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { AnimationOptions, LottieModule } from "ngx-lottie";

@Component({
	selector: "ban-not-found",
	host: { class: "ban-not-found" },
	imports: [CommonModule, MatCardModule, LottieModule],
	templateUrl: "./not-found.component.html",
	styleUrls: ["./not-found.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class NotFoundComponent {
	options: AnimationOptions = {
		path: "/assets/not-found/coffee-spilling.json",
	};
}
