import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LottieModule } from "ngx-lottie";

import { webShellRoutes } from "./web-shell.routes";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(webShellRoutes),
		BrowserAnimationsModule,
		HttpClientModule,
		LottieModule.forRoot({ player: () => import("lottie-web") }),
	],
	exports: [RouterModule],
})
export class WebShellModule {}
