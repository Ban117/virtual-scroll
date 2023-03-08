import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlagPipeModule } from "@ban/web/shared/pipes/flag";
import { CallingCodePipeModule } from "@ban/web/shared/pipes/calling-code";

import { CountryListItemComponent } from "./country-list-item.component";

@NgModule({
	imports: [CommonModule, FlagPipeModule, CallingCodePipeModule],
	declarations: [CountryListItemComponent],
	exports: [CountryListItemComponent],
})
export class CountryListItemModule {}
