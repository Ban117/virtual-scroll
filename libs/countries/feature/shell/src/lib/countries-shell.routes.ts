import { Routes } from "@angular/router";

export const countriesRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/countries/feature/list")).CountriesListModule,
	},
];
