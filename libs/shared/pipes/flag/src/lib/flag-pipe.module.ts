import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlagPipe } from "./flag.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [FlagPipe],
	exports: [FlagPipe],
})
export class FlagPipeModule {}
