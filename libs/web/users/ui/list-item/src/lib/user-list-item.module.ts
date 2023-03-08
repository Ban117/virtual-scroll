import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListItemComponent } from "./user-list-item.component";
import { AvatarModule } from "@ban/web/shared/ui/avatar";

@NgModule({
	imports: [CommonModule, AvatarModule],
	declarations: [UserListItemComponent],
	exports: [UserListItemComponent],
})
export class UserListItemModule {}
