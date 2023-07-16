import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallingCodePipe } from "./calling-code.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [CallingCodePipe],
	exports: [CallingCodePipe],
})
export class CallingCodePipeModule {}
