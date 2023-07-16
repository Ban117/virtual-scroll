import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	inject,
} from "@angular/core";

class VarDirectiveContext<TContext> {
	constructor(public $implicit?: TContext) {}
}

/**
 * Structural directive used to provide **typed** context variables
 */
@Directive({
	selector: `ng-template[banVarDirective]`,
	standalone: true,
})
export class VarDirective<TContext> implements OnInit {
	@Input()
	set banVarDirective(data: TContext) {
		this.context.$implicit = data;
	}

	private context = new VarDirectiveContext<TContext>();

	private vcr = inject(ViewContainerRef);
	private templateRef = inject(TemplateRef<TContext>);

	ngOnInit() {
		this.createView();
	}

	private createView() {
		this.vcr.clear();
		this.vcr.createEmbeddedView(this.templateRef, this.context);
	}

	static ngTemplateContextGuard<TContext>(
		_dir: VarDirective<TContext>,
		ctx: unknown,
	): ctx is VarDirectiveContext<TContext> {
		return true;
	}
}
