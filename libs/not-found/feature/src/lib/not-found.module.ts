import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";
import { MatCardModule } from "@angular/material/card";
import { LottieModule } from "ngx-lottie";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: NotFoundComponent,
			},
		]),
		MatCardModule,
		LottieModule,
	],
	declarations: [NotFoundComponent],
})
export class NotFoundModule {}
