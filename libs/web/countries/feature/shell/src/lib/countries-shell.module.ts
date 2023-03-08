import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { countriesRoutes } from "./countries-shell.routes";

@NgModule({
	imports: [CommonModule, RouterModule.forChild(countriesRoutes)],
})
export class CountriesShellModule {}
