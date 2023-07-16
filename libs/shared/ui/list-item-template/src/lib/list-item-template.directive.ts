import { Directive, Input } from "@angular/core";
import { Entity } from "@ban/shared/data-access/models";

interface ListItemTemplateContext<TItem extends Entity> {
	$implicit: TItem;
}

@Directive({
	selector: "ng-template[banListItem]",
	standalone: true,
})
export class ListItemTemplateDirective<TItem extends Entity> {
	@Input("banListItem") items!: TItem[] | "";

	static ngTemplateContextGuard<TContextItem extends Entity>(
		_dir: ListItemTemplateDirective<TContextItem>,
		ctx: unknown,
	): ctx is ListItemTemplateContext<TContextItem> {
		return true;
	}
}
