import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
	CachingInterceptor,
	SEARCH_URL,
} from "@ban/web/shared/data-access/caching";

import { usersRoutes } from "./users-shell.routes";

// for now redundant, but we might want to add users/:id for example
// will make refactoring easier
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(usersRoutes),
		HttpClientModule,
	],
	providers: [
		{ provide: SEARCH_URL, useValue: "start" },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CachingInterceptor,
			multi: true,
		},
	],
})
export class UsersShellModule {}
