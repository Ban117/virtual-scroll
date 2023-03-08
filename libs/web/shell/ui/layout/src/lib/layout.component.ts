import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, map, shareReplay } from "rxjs";

@Component({
	selector: "ban-layout",
	host: { class: "ban-layout" },
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	constructor(private breakpointObserver: BreakpointObserver) {}
}
