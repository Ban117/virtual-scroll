import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "ban-root",
	host: { class: "ban-root" },
	imports: [CommonModule, RouterModule],
	template: `<router-outlet />`,
	styleUrls: ["./app.component.scss"],
	standalone: true,
})
export class AppComponent {}
