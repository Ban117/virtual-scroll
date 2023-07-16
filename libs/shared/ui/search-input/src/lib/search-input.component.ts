import { CommonModule } from "@angular/common";
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	ViewEncapsulation,
	inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { fromEvent, debounceTime, tap } from "rxjs";

@Component({
	selector: "ban-search-input",
	host: { class: "ban-search-input" },
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
	],
	template: `
		<!-- apparently we actually have to wrap matInput in a mat-form-field even just to get styling 🤷‍♂️ -->
		<mat-form-field class="ban-list-search__form-field">
			<mat-label>{{ placeholder }}</mat-label>
			<mat-icon
				matPrefix
				(click)="$event.stopPropagation()"
			>
				search</mat-icon
			>
			<input
				#input
				type="text"
				matInput
			/>
			<button
				*ngIf="input.value"
				matSuffix
				mat-icon-button
				aria-label="Clear"
				(click)="searchTermChange.emit(''); input.value = ''"
			>
				<mat-icon>close</mat-icon>
			</button>
		</mat-form-field>
	`,
	styleUrls: ["./search-input.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class SearchInputComponent implements AfterViewInit {
	@ViewChild("input") input!: ElementRef;

	@Input() placeholder = "Search";

	@Input() debounceAmount = 150;

	@Output() readonly searchTermChange = new EventEmitter<string>();

	private destroyRef = inject(DestroyRef);

	ngAfterViewInit() {
		fromEvent<KeyboardEvent>(this.input.nativeElement, "keyup")
			.pipe(
				debounceTime(this.debounceAmount),
				tap(x => {
					this.searchTermChange.emit(
						(x.target as HTMLInputElement).value,
					);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
