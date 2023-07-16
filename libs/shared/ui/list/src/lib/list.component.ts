import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import {
	CdkVirtualScrollViewport,
	ScrollingModule,
} from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { Entity } from "@ban/shared/data-access/models";
import { ListItemTemplateDirective } from "@ban/shared/ui/list-item-template";
import { SearchInputComponent } from "@ban/shared/ui/search-input";

@Component({
	selector: "ban-list",
	host: { class: "ban-list" },
	imports: [
		CommonModule,
		ScrollingModule,
		SearchInputComponent,
		ListItemTemplateDirective,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
	],
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ListComponent<TItem extends Entity> {
	@ContentChild(ListItemTemplateDirective, { read: TemplateRef })
	itemTemplate: TemplateRef<TItem> | undefined;

	@ViewChild(CdkVirtualScrollViewport, { static: true })
	viewport!: CdkVirtualScrollViewport;

	@Input() title: string | undefined;

	@Input() itemSize!: number;

	@Input()
	get showSearch(): boolean {
		return this._showSearch;
	}
	set showSearch(value: BooleanInput) {
		this._showSearch = coerceBooleanProperty(value);
	}

	@Input() items?: TItem[] | null;

	@Input() reachedEnd: boolean | undefined;

	@Output() readonly offsetChange = new EventEmitter<number>();

	@Output() readonly searchTermChange = new EventEmitter<string>();

	selectedItems: Map<string, boolean> = new Map();

	private _showSearch = false;

	onScrolledIndexChange() {
		if (this.reachedEnd) {
			return;
		}

		const renderedRangeEnd = this.viewport.getRenderedRange().end;
		const dataLength = this.viewport.getDataLength();

		if (renderedRangeEnd >= dataLength) {
			this.offsetChange.emit(renderedRangeEnd);
		}
	}

	onCheckboxChange(item: TItem) {
		this.selectedItems.has(item.id)
			? this.selectedItems.delete(item.id)
			: this.selectedItems.set(item.id, true);
	}

	onContinueClicked() {
		console.log(
			"%c>>>> Listing Checked Items",
			"color: lightGreen",
			this.selectedItems,
		);
	}

	trackByFn(_index: number, item: TItem): string {
		return item.id;
	}
}
