import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { paymentsRoutes } from "./payments-shell.routes";

@NgModule({
	imports: [CommonModule, RouterModule.forChild(paymentsRoutes)],
})
export class PaymentsShellModule {}
