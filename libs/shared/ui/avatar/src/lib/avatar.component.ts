import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ViewEncapsulation,
} from "@angular/core";
import { InitialsPipe } from "@ban/shared/pipes/initials";
import { mapFirstNameToHexColor } from "@ban/shared/utils";

@Component({
	selector: "ban-avatar",
	host: { class: "ban-avatar" },
	imports: [CommonModule, InitialsPipe],
	templateUrl: "./avatar.component.html",
	styleUrls: ["./avatar.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class AvatarComponent {
	@Input()
	get avatarUrl(): string | undefined | null {
		return this._avatarUrl;
	}
	set avatarUrl(value: string | null | undefined) {
		if (value) {
			this.color = "";
		}
		this._avatarUrl = value;
	}

	@Input()
	get firstName(): string | null | undefined {
		return this._firstName;
	}
	set firstName(value: string | null | undefined) {
		if (!this.avatarUrl && value) {
			this.color = mapFirstNameToHexColor(value);
		}

		this._firstName = value;
	}

	@Input() lastName?: string;

	@Input() color?: string;

	private _firstName: string | undefined | null;
	private _avatarUrl: string | undefined | null;

	/**
	 * The width and height of the avatar.
	 * Ideally this would be limited to `xsmall` ,`small`, `medium` etc. with each
	 * being configurable with a `forRoot` but this isn't the focus of this task.
	 *
	 * @default 50
	 */
	@Input() size? = 50;
}
