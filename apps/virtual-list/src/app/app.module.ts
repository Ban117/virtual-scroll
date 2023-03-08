import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WebShellModule } from "@ban/web/shell/feature";

import { AppComponent } from "./app.component";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, WebShellModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
