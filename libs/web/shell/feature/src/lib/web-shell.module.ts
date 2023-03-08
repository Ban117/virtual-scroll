import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { webShellRoutes } from "./web-shell.routes";

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(webShellRoutes)],
})
export class WebShellModule {}
