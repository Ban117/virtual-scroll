import { Component } from "@angular/core";

@Component({
	selector: "ban-root",
	host: { class: "ban-root" },
	template: `<router-outlet></router-outlet>`,
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
