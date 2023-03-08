import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvatarComponent } from "./avatar.component";
import { InitialsPipeModule } from "@ban/web/shared/pipes/initials";

@NgModule({
	imports: [CommonModule, InitialsPipeModule],
	declarations: [AvatarComponent],
	exports: [AvatarComponent],
})
export class AvatarModule {}
