import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { User } from "@ban/users/data-access";

@Component({
	selector: "ban-user-list-item",
	host: { class: "ban-user-list-item" },
	templateUrl: "./user-list-item.component.html",
	styleUrls: ["./user-list-item.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent implements OnInit {
	@Input() user!: User;

	@Input() itemSize!: number;

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
