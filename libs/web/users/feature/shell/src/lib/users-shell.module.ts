import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { userRoutes } from "./users-shell.routes";

// for now redundant, but we might want to add users/:id for example
// will make refactoring easier
@NgModule({
	imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UsersShellModule {}
