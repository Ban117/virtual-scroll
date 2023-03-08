import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "ban-user-list",
	host: { class: "ban-user-list" },
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {}
