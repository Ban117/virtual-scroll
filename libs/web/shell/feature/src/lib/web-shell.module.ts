import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CachingInterceptor } from "@ban/web/shared/data-access/caching";
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
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CachingInterceptor,
			multi: true,
		},
	],
})
export class WebShellModule {}
