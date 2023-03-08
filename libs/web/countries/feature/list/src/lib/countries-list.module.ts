import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { CountryListComponent } from "./country-list.component";
import { ListModule } from "@ban/web/shared/ui/list";
import { ListItemTemplateModule } from "@ban/web/shared/ui/list-item-template";
import { CountryListItemModule } from "@ban/web/countries/ui/list-item";

const routes: Routes = [
	{
		path: "",
		component: CountryListComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ListModule,
		CountryListItemModule,
		ListItemTemplateModule,
	],
	declarations: [CountryListComponent],
})
export class CountriesListModule {}
