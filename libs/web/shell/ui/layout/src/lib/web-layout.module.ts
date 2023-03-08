import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";

import { LayoutComponent } from "./layout.component";

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		RouterModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
	],
	declarations: [LayoutComponent],
	exports: [LayoutComponent],
})
export class WebLayoutModule {}
