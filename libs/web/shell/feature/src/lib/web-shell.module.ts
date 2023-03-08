import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { webShellRoutes } from "./web-shell.routes";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(webShellRoutes),
		BrowserAnimationsModule,
	],
	exports: [RouterModule],
})
export class WebShellModule {}
