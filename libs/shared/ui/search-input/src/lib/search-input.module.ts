import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { SearchInputComponent } from "./search-input.component";

@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
	],
	declarations: [SearchInputComponent],
	exports: [SearchInputComponent],
})
export class SearchInputModule {}
