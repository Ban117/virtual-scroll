import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { SearchInputModule } from "@ban/shared/ui/search-input";
import { ListItemTemplateModule } from "@ban/shared/ui/list-item-template";
import { ListComponent } from "./list.component";

@NgModule({
	imports: [
		CommonModule,
		ScrollingModule,
		SearchInputModule,
		ListItemTemplateModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
	],
	declarations: [ListComponent],
	exports: [ListComponent],
})
export class ListModule {}
