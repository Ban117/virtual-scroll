import { Routes } from "@angular/router";

export const countriesRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@ban/web/countries/feature/list"))
				.CountriesListModule,
	},
];
