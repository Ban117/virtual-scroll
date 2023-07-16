import { CommonModule } from "@angular/common";
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
	ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
	BehaviorSubject,
	Subject,
	fromEvent,
	debounceTime,
	tap,
	takeUntil,
} from "rxjs";

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
	templateUrl: "./search-input.component.html",
	styleUrls: ["./search-input.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class SearchInputComponent implements AfterViewInit, OnDestroy {
	@ViewChild("input") input!: ElementRef;

	@Input() searchTerm$!: BehaviorSubject<string>;

	@Input() placeholder = "Search";

	@Input() debounceAmount = 150;

	private readonly _destroy$ = new Subject<void>();

	ngAfterViewInit() {
		fromEvent<KeyboardEvent>(this.input.nativeElement, "keyup")
			.pipe(
				debounceTime(this.debounceAmount),
				tap(x => {
					this.searchTerm$.next((x.target as HTMLInputElement).value);
				}),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
