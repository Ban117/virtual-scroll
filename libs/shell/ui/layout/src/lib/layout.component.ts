import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import {
	BreakpointObserver,
	Breakpoints,
	LayoutModule,
} from "@angular/cdk/layout";
import { Observable, map, shareReplay } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

@Component({
	selector: "ban-layout",
	host: { class: "ban-layout" },
	imports: [
		CommonModule,
		LayoutModule,
		RouterModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
	],
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LayoutComponent {
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);
}
