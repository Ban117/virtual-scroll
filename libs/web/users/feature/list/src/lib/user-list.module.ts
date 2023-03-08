import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: UserListComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	declarations: [UserListComponent],
})
export class UsersListModule {}
