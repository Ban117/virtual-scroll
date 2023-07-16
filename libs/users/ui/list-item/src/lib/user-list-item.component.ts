import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { AvatarComponent } from "@ban/shared/ui/avatar";
import { User } from "@ban/users/data-access";

@Component({
	selector: "ban-user-list-item",
	host: { class: "ban-user-list-item" },
	imports: [CommonModule, AvatarComponent],
	templateUrl: "./user-list-item.component.html",
	styleUrls: ["./user-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class UserListItemComponent implements OnInit {
	@Input({ required: true }) user!: User;

	@Input({ required: true }) itemSize!: number;

	avatarSize!: number;

	avatarPaddingSize!: number;

	ngOnInit() {
		// we need to use a fixed height for items since we're using virtual scrolling
		// but at least like this the size is declared in the parent and then the avatar
		// size and the padding is derived from the `itemSize`
		this.avatarSize = this.itemSize * 0.5;
		this.avatarPaddingSize = Math.floor(this.itemSize * 0.25); // was clipping
	}
}
