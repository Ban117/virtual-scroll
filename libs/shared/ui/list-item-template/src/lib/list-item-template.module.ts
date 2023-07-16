import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListItemTemplateDirective } from "./list-item-template.directive";

@NgModule({
	imports: [CommonModule],
	declarations: [ListItemTemplateDirective],
	exports: [ListItemTemplateDirective],
})
export class ListItemTemplateModule {}
