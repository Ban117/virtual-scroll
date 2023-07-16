import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InitialsPipe } from "./initials.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [InitialsPipe],
	exports: [InitialsPipe],
})
export class InitialsPipeModule {}
