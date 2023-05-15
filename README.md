# CDK Virtual Scroll

A project I had done that I've now used to learn Nx. Totally overkill for a project of this scale but it was still fun to explore Nx Monorepos.

## Running the app and server

* Run `npm run serve` then `npm start` and go to localhost 

## Project Architecture

### Nx
* Stuck to suggested approach of having smart components inside `feature` libs, presentational components inside `ui` libs, `data-access` contains services

* Where needed refactored to out `/shared` directory in `libs`

* Although it would probably make more sense to use the new Nx Standalone feature, most larger scale companies are more likely to be using standard Nx Monorepos

### SCAM
* Although standalone components are now out of developer preview with Angular, 15 I still decided to use [SCAM](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b). It's similar to standalone components, since Angular 15 is wrapping standalone components in some "behind the scenes" `NgModule`.

### `CdkVirtualScrollViewport`

* Since we don't want 1000 of DOM elements rendered, I decided to use the `CdkVirtualScrollViewport`. The only issue I had is that with the default `VirtualScrollStrategy`, `FixedSizeVirtualScrollStrategy`, setting `setTotalContentSize` gets overridden on scroll (see: https://github.com/angular/components/blob/main/src/cdk/scrolling/fixed-size-virtual-scroll.ts#L117), therefore my list's scrollbar decreases in size as the user scrolls. To fix this, I would have had to implement a custom `VirtualScrollStrategy`

### `ngTemplateOutlet`

* Content projection alone wouldn't have been enough to have a generic list component. Using `ngTemplateOutlet` is much more powerful and it's a great tool for creating more flexible and generic components.

* `ngTemplateContextGuard`, a nice trick that's also used internally in Angular's structural directives allows for template type checking of `let-` variables. It requires passing an input to the `ListItemTemplateDirective` directive redundantly, but the reward is template typechecking as can seen below
![Alt text](img/Screenshot%202023-03-08%20at%2016.53.18.png)
![Alt text](img/Screenshot%202023-03-08%20at%2016.53.45.png)
![Alt text](img/Screenshot%202023-03-08%20at%2016.54.09.png)

## Data

* Many fields in the countries array are duplicate, this was intentional as this is how the data was originally provided


// todo look into `ngStyle` and rm `ngStyle`
