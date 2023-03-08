import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListItemComponent } from "./user-list-item.component";

@NgModule({
	imports: [CommonModule],
	declarations: [UserListItemComponent],
	exports: [UserListItemComponent],
})
export class UserListItemModule {}
