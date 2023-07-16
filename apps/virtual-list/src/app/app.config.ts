import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {
	provideRouter,
	withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { appRoutes } from "./app.routes";
import { provideLottieOptions } from "ngx-lottie";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
		provideAnimations(),
		importProvidersFrom(HttpClientModule),
		provideLottieOptions({
			player: () =>
				import(/* webpackChunkName: 'lottie-web' */ "lottie-web"),
		}),
	],
};
