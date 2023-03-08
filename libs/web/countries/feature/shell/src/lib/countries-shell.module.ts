import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { countriesRoutes } from "./countries-shell.routes";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(countriesRoutes),
		HttpClientModule,
	],
})
export class CountriesShellModule {}
