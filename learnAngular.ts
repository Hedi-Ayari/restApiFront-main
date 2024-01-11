// # data Binding
// # String Interpolation
// example: {{ data }}
// # Property Binding
// example: [property]="data"
// example: <input [value]="data">
// we can create custom properties and bind to them
// example : <app-servers [srvElement]="server"></app-servers>
// # Event Binding
// example: (event)="expression"
// example: (click)="onClicked()"
// # Two-Way-Binding
// example: [(ngModel)]="data"
// ngModel is a directive that comes with the FormsModule and allows us to establish data binding between input and data




// # Directives

// they split to two types: structural and attribute directives

// structural directives are directives that change the structure of the DOM like *ngIf and *ngFor
// attribute directives are directives that change the appearance or behavior of an element, component, or another directive like ngStyle and ngClass

// # Structural Directives
// they affect the whole dom
// usually start with *
// example: *ngIf="condition"
// example: *ngFor="let item of list"
// # ngIf
// example: <p *ngIf="condition">Text to show</p
// # ngFor
// example: <p *ngFor="let item of list">Text to show</p>

// # ngSwitch
// example: <div [ngSwitch]="value">
//   <p *ngSwitchCase="5">Value is 5</p>
//   <p *ngSwitchCase="10">Value is 10</p>
//   <p *ngSwitchDefault>Value is Default</p>
// </div>

// # Built-in Attribute Directives

// only affect the element they are added to

// # ngStyle
// example: <p [ngStyle]="{backgroundColor: getColor()}">Style me with ngStyle</p>
// # ngClass
// example: <p [ngClass]="{online: serverStatus === 'online'}">Style me with ngClass</p>


// # Custom Attribute Directives
// @Directive({
//     selector: '[appBasicHighlight]'
//   })
// the [] in the selector means we can use it as an attribute
// we need to import it in the app.module.ts file and add it to the declarations array

// we can either use the renderer to change the style or we can use the host listener to listen to events
// #renderer
// renderer is a service that allows us to change the dom
// constructor(private rendered: Renderer2, private elementRef: ElementRef) { }

//   ngOnInit(): void {
//     this.rendered.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
//   }

// #host listerner
// its just like addEventListener in vanilla js
//! host listener is a decorator that allows us to listen to events
//  @HostListener('mouseenter') mouseover(eventData: Event) {
//     this.rendered.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
//   }
//   @HostListener('mouseleave') mouseleave(eventData: Event) {
//     this.rendered.setStyle(this.elementRef.nativeElement, 'background-color', 'red')
//   }

// #host binding
// host binding is a decorator that allows us to bind to properties of the element the directive is placed
// like this @HostBinding('style.backgroundColor') or @HostBinding('class.open')
// style or class are properties of the element the directive is placed on and backgroundColor or open are values of the properties
// @HostBinding('style.backgroundColor') backgroundColor: string = "transparent";
// here we are binding to the style.backgroundColor property of the element the directive is placed on
// then we can change the value of the property in the directive class
// this.backgroundColor = "blue"



// ? communication between components


// ! @Input() and @Output()

// ? @input() is used to pass data from parent to child component
// example: <app-servers [srvElement]="server"></app-servers>
// here we are passing server data to child component
// in the child component we can access the data using @input() decorator
// example: @Input('srvElement') element: { type: string, name: string, content: string };

// ? @Output() is used to pass data from child to parent component

// *example: <app-cockpit (serverCreated)="onServerAdded($event)" ></app-cockpit>
// here we are passing data from child component to parent component
// in the child component we can emit data using @Output() decorator
//* example: @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
// *example: this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.newServerContent })
// in the parent component we can access the data using $event
//* example: onServerAdded(serverData: { serverName: string, serverContent: string })

// output basically emits an event which can be listened by parent component
// we can also use alias for @Output() decorator
// example: @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();;

// # View Encapsulation
// Angular uses shadow DOM to encapsulate styles
// shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components

// we can disable this by using ViewEncapsulation.None
// means styles will be applied globally and not just to the component

// # Local Reference
// *example: <input type="text" #serverNameInput>
// here #serverNameInput is a local reference
// we can access directly in the template using {{ serverNameInput.value }}
// we can access it in the component using @ViewChild decorator
// *example: @ViewChild('serverNameInput',{ static: true })  serverNameInput: ElementRef;
// here serverNameInput is a local reference
// now we simply access it using serverNameInput.nativeElement.value
// because serverNameInput is an ElementRef we can access it's nativeElement property which is a DOM element

// # ng-content
// example: <ng-content></ng-content>
//! ng-content is used to pass content from parent to child component
// <div class="panel-body">
// <ng-content></ng-content>
// </div>
// here we are getting the content between the tags of the component

// basically ng-content is used when we want to pass content from parent to child component
// like this <app-server-element> <p>some content</p> </app-server-element>
// here we are passing <p>some content</p> from parent to child component
// in the child component we can access the content using @ContentChild decorator
// example: @ContentChild('contentParagraph',{ static: true }) paragraph: ElementRef
// here contentParagraph is a local reference
// now we simply access it using paragraph.nativeElement.textContent

// another example

// <app-server-element *ngFor="let element of serverElements" [srvElement]="element">
//         <p>
//           <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
//           <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
//         </p>
//       </app-server-element>




// # component lifecycle

// ! checked means angular has checked the data for changes and updated the view if needed
// constructor: called when angular creates the component
// ngOnChanges: called after a bound input property changes : this is called before ngOnInit and whenever one or more data-bound input properties change
// ngOnInit: called once the component is initialized
// ngDoCheck: called during every change detection run :  (even if the data is not changed)
// ngAfterContentInit: called after content (ng-content) has been projected into view
// ngAfterContentChecked: called every time the projected content has been checked
// ngAfterViewInit: called after the component's view (and child views) has been initialized
// ngAfterViewChecked: called every time the view (and child views) have been checked
// ngOnDestroy: called once the component is about to be destroyed


//! @ViewChild('serverContentInput',{ static: true }) serverContentInput: ElementRef;
//! @ViewChild is used to access local reference in the component class
// here serverContentInput is a local reference

//? @ContentChild('contentParagraph',{ static: true }) paragraph: ElementRef;
//? @ContentChild is used to access local reference in the component class
// here contentParagraph is a local reference

//? @ContentChild and @ContentChildren queries will return directives existing inside the <ng-content></ng-content> element of your view,
//  whereas @ViewChild and @ViewChildren only look at elements that are on your view template directly.

// In summary, @ViewChild is used with elements from a component's own template,
//  while @ContentChild is used with elements that are used between the opening and closing tags of a component (content projection).


//# constructor is used to inject dependencies
// example: constructor(private loggingService: LoggingService) { }
// here we are injecting LoggingService dependency
// ! adding private keyword before the argument is a shortcut to create a property with the same name and store the argument in it


// #Dependency Injection and Services

// ! services are used to share data between components and to make our code more modular
// services is class which act as a central place to store data and logic that is used by multiple components


// this is how we inject a service in a component, by adding it to the providers array and adding it as an argument in the constructor
// providers array is used to tell angular that we want to use this service in this component
// !example: providers: [LoggingService]
// its not necessary to add it to the providers array if we add it to the constructor but its a good practice to do so
// you can also add it to the providers array in the app.module.ts file to make it available to all components
// !constructor(private loggingService: LoggingService) { }

// then we just call the method we want to use
// example: this.loggingService.logToConsole(status)

// dependency injection is a design pattern in which a class requests dependencies from external sources rather than creating them itself
// basically we are injecting the service into the component
// the external source is the angular framework

// ?Dependency: This is an object that can be used (a service). An Angular service is a class with a specific purpose.

// ?Injection: This is the passing of a dependency to a dependent object (a client) that would use it.
// # Hierarchical Injector
// Angular creates a hierarchical injector for each component
// this means that each component has its own injector
// this means that each component has its own instance of a service
// also the child component can access the services of the parent component but not the other way around
// if we add a service to the providers array of the app.module.ts file then all components will share the same instance of the service
// if we add a service to the providers array of the app.component.ts file then all components will share the same instance of the service

// if we add a service inside each component then each component will have its own instance of the service
// which means that if we change the data in one component it will not affect the data in the other component
// this is because each component has its own instance of the service

// !@Injectable() decorator is used to tell angular that this class can be injected into other classes
// means this class can be used as a service
// we added to the service that is the receiving service , not the service that is being
// its not necessary to add it to the service that is being injected but its a good practice to do so


// ?Routing and Navigation in Angular
// we first need to either create an array of routes in the app.module.ts file or in the routes file
// const appRoutes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'users', component: UsersComponent },
//     { path: 'servers', component: ServerComponent }
//   ]

// then we need to import the RouterModule and add it to the imports array
// !RouterModule.forRoot(appRoutes)
// forRoot is used to tell angular that this is the root router module

// then we need to add the router-outlet directive to the app.component.html file
// !<router-outlet></router-outlet> : this means that the component that matches the path will be rendered here

// then we need to add the routerLink directive to the anchor tag
// <li role="presentation" class="active"><a routerLink="/">Home</a></li>
// routerLink is used to tell angular that this is a link to a route
// keep in mind that routerLink is not an attribute but a directive, and it prevent the default reload of the page

//! the difference relative and absolute path is that relative path is relative to the current path
// example: <a routerLink="/users">Users</a> : this is an absolute path: it will be appended to the root domain
// example: <a routerLink="users">Users</a> : this is a relative path, it will be appended to the current path: /servers/users

// routerLinkActive is used to add a class to the element if the route is active
// active means that we are currently on this route
// example: <li role="presentation" routerLinkActive="active"><a routerLink="/">Home</a></li>
// ![routerLinkActiveOptions]="{exact:true}" is used to tell angular that this route should be active only if the path is exactly the same
// example: <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><a routerLink="/">Home</a></li>
// the active class is added to the element always because we got the / path in all routes
// so to fix it we should add the exact option, means the routerLinkActive directive will be added only if the path is exactly the same

// we can also navigate programmatically
// we need to inject the router service in the constructor first
// example: constructor(private router: Router) { }
// navigate takes an array of paths as an argument
// the navigate link doesnt know on which route we are currently on
// so we need to tell it on which route we are currently on , by default its the root domain
// !example: this.router.navigate(['/servers'])
// we can also pass an object as a second argument to navigate

// we need to inject the ActivatedRoute service in the constructor first
// the ActivatedRoute service is used to get information about the current route
// !this.router.navigate(['servers'], { relativeTo: this.route })


// # Passing Parameters to Routes
// we can pass parameters to routes by adding a colon before the parameter name
// example: { path: 'users/:id', component: UserComponent }
// here we are passing the id parameter to the route

// # Fetching Route Parameters

// its usually better to convert the route parameter to a number by adding a plus sign before it
// const id = +this.route.snapshot.params['id']

// we need to inject the ActivatedRoute service in the constructor first
// constructor(private route: ActivatedRoute) { }

// then we can access the parameters using the snapshot property
// snapshot is used to get the current state of the route means the current parameters
// !this.name= this.route.snapshot.params['name']


// snapshot gets the values on when the component is initialized

// there is a problem with this approach , if we are on the same component and we click on a link to the same component but with different parameters
// the component will not be reloaded and the parameters will not be updated because the component is already loaded
// to fix this we need to subscribe to the params property
// !this.route.params.subscribe((params: Params) => {
//  !   this.user.id = params['id'];
//   !  this.user.name = params['name'];
// !  })
// this will update the parameters whenever they change

// # passing query parameters and fragments
// we can pass query parameters by adding a question mark after the route and then the query parameters
// using RouterLink directive
// !<a [routerLink]="['/servers',5,'edit']" [queryParams]="{allowEdit:'1'}" fragment="loading" class="list-group-item"
// using navigate method
// !this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '1' }, fragment: 'loading' })

// # retrieving query parameters and fragments
// we need to inject the ActivatedRoute service in the constructor first

// then we can access the query parameters using the snapshot property
// !this.route.snapshot.queryParams, we can specify the name of the query parameter, example: this.route.snapshot.queryParams['allowEdit']
// we can also access the fragment using the snapshot property
// !this.route.snapshot.fragment

// the bette approach is to subscribe to the queryParams and fragment properties
//  this.route.queryParams.subscribe((queryParms) => {
// console.log(queryParms)})

// this.route.fragment.subscribe((fragment) => {
// console.log(fragment)})



// # Nested routes (child routes)
// we need to add the child routes to the parent route
// example: { path: 'servers', component: ServersComponent, children: [
// { path: ':id', component: ServerComponent }, { path: ':id/edit', component: EditServerComponent } ] }
// here we are adding the child routes to the servers route
// we need to add the router-outlet directive to the parent component template to render the child routes
// !<router-outlet></router-outlet>

// queryParamsHandling: 'preserve' is used to preserve the query parameters when we navigate to a child route
// !this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
// means if we are on the servers/5/edit route and we click on the edit button the query parameters will be preserved


// # Redirecting and Wildcard Routes
// we can redirect to a route by adding a path to the redirectTo property
// !example: { path: '**', redirectTo: '/not-found' }
// here we are redirecting to the not-found route
// the ** means any route that is not defined in the routes array

// pathMatch: 'full' is used to tell angular that the path should match exactly
// we use it when we are redirecting to a route that is not the root route

// # Guards
// guards are used to protect routes from unauthorized access
// we need to create a guard service first
// example: export class AuthGuard implements CanActivate {
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
// !the activatedRouteSnapshot is used to get information about the route
// !the routerStateSnapshot is used to get information about the router state
// we need to return a boolean or an observable or a promise
// !example: return this.authService.isAuthenticated()
// .then((authenticated: boolean) => {
// if (authenticated) {
// return true
// } else {
// this.router.navigate(['/'])
// return false
// }
// })

// we need to export the guard service
//? export const canActivateGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
// ?    return inject(AuthGuard).canActivate(next, state);
//  ?  }
// canActivateGuard is used to tell angular that this is a guard service


// THEN we need to add the guard to the routes array in the app-routing.module.ts file
// !{ path: 'servers', canActivate: [AuthGuard], component: ServersComponent]}
// canActivate is used to tell angular that this route is protected by this guard
// means if the guard returns true then the route will be activated

// if we want to protect child routes we need to use canActivateChild instead of canActivate
// same logic as canActivate, the only difference is that canActivateChild is used to protect child routes
// and we inject canActivateChild instead of canActivate

// # canDeactivate
// canDeactivate is used to prevent a user from leaving a route if he has unsaved changes
// https://dev.to/junlow/angular-15-transitioning-deprecated-candeactivate-to-functional-guards-4ia8

// # passing static data in routes
// we can just add a property called data to the route
//   !{ path: 'not-found', component: ErrorPageComponent, data: { message: "error! Page not Found." } },

// then we get the data using the snapshot property or the subscribe method
// !this.errorMessage = this.route.snapshot.data['message']
//  ?this.route.data.subscribe((data: Data) => {
//     this.errorMessage = data['message']
//   })

// # resolving dynamic data in routes

// resolving dynamic data in routes is used to fetch data before the component is loaded
// we need to create a resolver service first

// interface Server {
//     id: number;
//     name: string;
//     status: string;
//   }

//   @Injectable({
//     providedIn: 'root'
//   })
//   export class ServiceResolverService {

//     getServer(id: number) {
//       return this.ServersService.getServer(id)
//     }

//     constructor(private ServersService: ServersService) { }

//   }

//   export const serverResolver: ResolveFn<Server> =
//     (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server => {
//       return inject(ServiceResolverService).getServer(route.params['id'])
//     }

// and then simply add it to the routes array using the resolve property

// { path: ':id', component: ServerComponent, resolve: { server: serverResolver } },

// then we can access the data using the snapshot property or the subscribe method
// !this.server = data['server']

// # Location Strategies
// there are two location strategies: hash and path
// path is the default strategy and it uses the path sign to navigate to a route
// to use it we need to add the useHash property to the forRoot method
// export const AppRoutingRoutes = RouterModule.forRoot(routes, { useHash: true });
// example: http://localhost:4200/#/servers
// path strategy uses the path to navigate to a route
// example: http://localhost:4200/servers


// #Observables
// observables are used to handle asynchronous tasks like http requests and events
// observable are basically a stream of data that we can subscribe to
// ! using observables is better than using promises because we can cancel the subscription
// we subscribe to an observable to get the data using the subscribe method

// ? operators in observables

// pipe() is used to chain operators
// example: this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(map((response: Response) => {}))
// then we can use the subscribe method to get the data
// operators are used to transform the data we get from the observable
// example: map operator is used to transform the data we get from the observable
// example: switchMap operator is used to switch to another observable
// example: catchError operator is used to catch errors
// example: tap operator is used to execute code without changing the data
// example: take operator is used to take only a certain amount of data

// ?Subject
// subject is a special type of observable that allows us to multicast a value or event to multiple subscribers
// we can also subscribe to a subject like an observable
// we can also pass data to a subject using the next method
// example: this.subject.next(data) : this will pass the data to all subscribers


// #Forms
// the main reason why we need angular helps because we are building a spa application means we cant send requests to the server directly
// angular offers two types of forms, template driven forms and reactive forms
// template driven forms are used to build simple forms with less code
// reactive forms are used to build complex forms with more code but more control

// #Template Driven Forms
// template driven forms are used to build simple forms with less code
// we need to import the FormsModule in the app.module.ts file
// The first thing we need to do is to add the ngModel directive to the input element
// ngModel is used to create a two way data binding between the input and the data means the input will be updated whenever the data changes and vice versa
// example: <input type="text" id="username" class="form-control" ngModel name="username">
// ! we need to add the name attribute to the input element to make it work
// we can also pass a default value to the input element using ngModel
// then we need to add the ngForm directive to the form element
// ngForm is used to tell angular that this is a form
// then we need to add the ngSubmit directive to the form element
// ngSubmit is used to tell angular that this is a submit button
// !example: <form (ngSubmit)="onSubmit(f)" #f="ngForm">
// here we are passing the form to the onSubmit method
// its not recommended to put the onSubmit method in the submit button because it will trigger the default behavior of the submit button

// we can also access the form using @ViewChild decorator
// example: @ViewChild('f') signupForm: NgForm;
// here f is a local reference

// #validation
// we can add validation to the input element by adding the required attribute
// example: <input type="text" id="username" class="form-control" ngModel name="username" required>
// we can also add the minlength and maxlength attributes
// we can even style error messages using the ngModel directive
// <input type="email" id="email" class="form-control" ngModel name="email" email #email="ngModel">
//             <span class="help-block" *ngIf="!email.valid && !email.touched">Please enter a valid email!</span>

// setting values using setValue and patchValue
// we can set values using setValue and patchValue
// setValue is used to set all values
// !@ViewChild('f') signupForm: NgForm;

// const suggestedName = 'Superuser';
// this.signupForm.setValue({
//     username: suggestedName,
//     email: '',
//     gender: 'male',
//     secret: 'pet',
//     questionAnswer: '',
// })
// // patchValue is used to set some values

// this.signupForm.form.patchValue({
//     username: 'Superuser'

// })


// using form data
// we can access the form data using the value property
// example: this.user.username = this.signupForm.value.username

// reseting the form
// we can reset the form using the reset method
// this.Form.reset()
// !this.signupForm.reset()


// #Reactive Forms
// reactive forms are used to build complex forms with more code but more control

// !we need to import the ReactiveFormsModule in the app.module.ts file
// then we need to import the FormGroup and FormControl classes from the @angular/forms package
// !example: import { FormGroup, FormControl } from '@angular/forms';
// formGroup is used to create a form group , a form group is a group of form controls
// formControl is used to create a form control, a form control is a single input element

// to create a form group we need to create a property of type FormGroup
// example: signupForm: FormGroup;
// then we need to instantiate it in the ngOnInit method
// example: ngOnInit(): void {
//     this.signupForm = new FormGroup({
//       'username': new FormControl(null),
//       'email': new FormControl(null),]
//     })

// form control takes three arguments, the first one is the default value,
// the second one is the validators and the third one is the async validators
// !example: 'username': new FormControl(null, Validators.required),

// we can also create nested form groups
// example: 'userData': new FormGroup({
//       'username': new FormControl(null, Validators.required),
//       'email': new FormControl(null, [Validators.required, Validators.email]),
//     })

// ? we need to add the formGroupName directive to the element that contains the form group

// next we need to add the formGroup directive to the form element
// example: <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
// then we need to add the formControlName directive to the input elements
// example: <input type="text" id="username" class="form-control" formControlName="username">
// formControlName is used to tell angular that this is a form control and it takes the name of the form control as an argument


// to show the the form data
// we can access the form data using the value property
// !example: this.signupForm.value

// #validation
// we can add validation to the form control by passing the validators as a second argument to the form control
// !example: 'username': new FormControl(null, Validators.required),
// we can also pass multiple validators
// !example: 'email': new FormControl(null, [Validators.required, Validators.email]),

// #getting access to controls
// we can get access to the controls using the get method
// !example: this.signupForm.get('username')
// then we can simply check if the control is valid or not or if it has been touched or not etc etc

// #getting access to nested controls
// we can get access to nested controls using the get method
// !example: this.signupForm.get('userData.username')

// #form array
// form array is used to create a list of form controls or form groups
// example: 'hobbies': new FormArray([])
// then we need to add the formArrayName directive to the element that contains the form array


// #custom validators
// Example:
// forbiddenNames(control: FormControl): { [s: string]: boolean } {

//     if (this.forbiddenUsernames.indexOf(control.value)) {
//       return { 'nameIsForbidden': true };
//     }

//     return null


//   }

// we need to add the custom validator to the form control
// 'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
// we used the bind method to bind the this keyword to the component class, because angular will execute the method in a different context
// and it wont be able to have access to the component class

// #custom async validators
// custom async validators are used to validate data asynchronously
// forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
//     const promise = new Promise<any>((resolve, reject) => {
//       setTimeout(() => {
//         if (control.value === 'Test') {
//           resolve({ 'nameIsForbidden': true })
//         } else {
//           resolve(null)
//         }
//       }, 1500)
//     })
//     return promise;
//   }

// and we should add the async validator to the form control which is the third argument
// 'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.forbiddenNamesAsync.bind(this)),

// #reacting to status or value changes
// we can react to status changes using the statusChanges property of the form or value changes using the valueChanges property of the form
// this.signUpForm.valueChanges.subscribe((value) => {
//     console.log(value);
//   })
//   this.signUpForm.statusChanges.subscribe((value) => {
//     console.log(value);
//   })

// #setting and patching values
// we can set values using the setValue method and patch values using the patchValue method
// this.signUpForm.setValue({
//     'userData': {
//       'username': 'Max',
//       'email': ''
//     },
//     gender: 'male'
//   })

//   this.signUpForm.patchValue({
//     'userData': {
//       'username': 'Max',
//       'email': ''
//     },
//     gender: 'male'
//   })

// #resetting the form
// onSubmit() {
//     console.log(this.signUpForm);
//     this.signUpForm.reset();
//   }



// # Pipes
// the main purpose of pipes is to transform data before displaying it
// pipe is only used in the template
// pre defined pipes
// *uppercase
// !    {{ server.instanceType | uppercase }}
// *lowercase
// *date   {{ server.started | date }}
// we can also pass a format to the date pipe
// !{{ server.started | date : "fullDate" }}
// *number
// *currency
// *json
// *async : this pipe is used to handle asynchronous tasks, async will check if the data is a promise or an observable and then it will subscribe to it

// #chaining pipes

// we can chain pipes
// chaining pipes from left to right means the first pipe will be executed first
// !{{ server.started | date : "fullDate" | uppercase }}

// #creating custom pipes
// we need to create a class that implements the PipeTransform interface
// export class ShortenPipe implements PipeTransform {

//     transform(value: any, args?: any): any {
//       if (args > 10) {
//         return value.substr(0, 12) + '...';
//       }
//       return value
//     }

// and we use it like
// ! <strong>{{ server.name | shorten : 11 }}</strong>


// #filtering data with pipes
// we can filter data using pipes
// we need to create a class that implements the PipeTransform interface
// then simply implement the filter logic

// Example:
// export class FilterPipe implements PipeTransform {

//     transform(value: any, filterString: string, propname: string): any {

//       if (value.length === 0 || filterString === '') {
//         return value;
//       }
//       const resultArray = []
//       for (const item of value) {

//         if (item[propname] === filterString) {

//           resultArray.push(item)

//         }
//       }
//       return resultArray
//     }

//   }

// and we use it like this
// <input type="text" [(ngModel)]="filteredStatus" />
// ! *ngFor="let server of servers | filter : filteredStatus : 'status'"


// #http
// we need to import the HttpClientModule in the app.module.ts file and add it to the imports array
// then we need to inject the HttpClient service in the constructor
// example: constructor(private http: HttpClient) { }

// #sending a post request
// we can send a post request using the post method
// example: this.http.post(this.url, postData).subscribe(responseData => {})
// the post method takes two arguments, the first one is the url and the second one is the data
// note: the post method returns an observable so we need to subscribe to it to get the data, otherwise the request wont be sent

// #sending a get request
// we can send a get request using the get method
// example: this.http.get(this.url).subscribe(responseData => {})

// #transforming response data
// we can transform response data using the pipe method
// example: this.http.get(this.url).pipe(map(responseData => {})).subscribe(responseData => {})

// Example:

// onFetchPosts() {
//     this.http.get(this.url)
//       .pipe(map(responseData => {
//         const postArray = [];
//         // Cast responseData to an array
//         const dataArray = Object.values(responseData);

//         for (const key in dataArray) {
//           if (dataArray.hasOwnProperty(key)) {
//             postArray.push({ ...dataArray[key], id: key })
//           }
//         }
//         return postArray;
//       }))
//       .subscribe(posts => {
//         console.log(posts);
//       })
//   }

//  # using types with the http client
// we can use types with the http client
// http methods are generic methods means we can pass a type to them and they will return an observable of that type
// example: this.http.get<Post[]>(this.url)
// example: this.http.post<Post>(this.url, postData)

// #http client with services
// we can use the http client with services
// we need to inject the http client service in the constructor
// and we simply a return a http method and subscribe to it in the component
// the other approach is to use a subject to emit the data if more than one component is listening to the data

// #error handling
// we can handle errors using the catchError operator
// example: this.http.get(this.url).pipe(catchError(error => {})).subscribe(responseData => {})

// # error handling with subjects

// We first need to create a subject
// error = new Subject<string>()

// then we need to emit the error

// AddPost(postData: Post) {
//     ! Send Http request
//     this.http.post<{ name: string }>(this.url, postData).subscribe(responseData => {
//       console.log(responseData);
//     }, error => {
//       ? this.error.next(error.message)
//     });
//   }

// # error handling with catchError operator
// we first need to import handleError  and throwError from rxjs/operators

// import { map, catchError } from 'rxjs/operators';
// import { Subject, throwError } from 'rxjs';
// then we need to return the catchError operator

// catchError(errorRes => {
//   return throwError(errorRes)
// })

// catch error is a more generic approach because we can handle the error directly in the component

// # setting headers
// we can set headers using the HttpHeaders class
// we need to import the HttpHeaders class from the @angular/common/http package
// import { HttpHeaders } from '@angular/common/http';
// then we need to instantiate it
// !const headers = new HttpHeaders({ 'Custom-Header': 'Hello' })
// then we need to pass it as a third argument to the http method
// !this.http.get(this.url, { headers: headers })

// # setting query params
// we can set query params using the HttpParams class
// we need to import the HttpParams class from the @angular/common/http package
// import { HttpParams } from '@angular/common/http';
// then we need to instantiate it
// !let params = new HttpParams();
// then we need to set the params
// !params = params.set('print', 'pretty')
// then we need to pass it as a third argument to the http method
// !this.http.get(this.url, { params: params })

// if we have multiple params we can chain the set method
// example: this.http.get(this.url,{params;params.set('print','pretty').set('custom','key')})
// or we can use append method
// example: params = params.append('custom', 'key')

// # different types of responses
// we can get different types of responses
// we can use the observe property to get different types of responses
//    ! this.http.post<{ name: string }>(this.url, postData, { observe: 'response' }).subscribe(responseData => {})
// means we are getting the full response, the default value is body though

// you can also observe the events
// !this.http.post<{ name: string }>(this.url, postData, { observe: 'events' }).subscribe(responseData => {})
// events are used to track the progress of the request means when the request is sent, when the response is received etc etc

//  # changing the response type
// we can change the response type using the responseType property
// !this.http.post<{ name: string }>(this.url, postData, { responseType: 'text' }).subscribe(responseData => {})
// the default is json and most of the times we don't need to change it

// #interceptors
// interceptors are used to intercept requests and responses
// interceptors are used to add headers to requests and responses
// interceptors  will basically run code before the request is sent and after the response is received
// we need to create a class that implements the HttpInterceptor interface
// export class AuthInterceptorService implements HttpInterceptor
// and we need to implement the intercept method
// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req);
// }

// then we need to add the interceptor to the providers array in the app.module.ts file
// providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],

// now every time we send a request the intercept method will run


// inside the intercept method we can access the request and the response using the req and next arguments

// if we want to keep the old headers we need to clone the request and add the new headers to it using append

// if you want to pass the interceptor to a specific request you can use an if check to check the url

// #manipulating the response
// we can manipulate the response using the pipe method
// return next.handle(modifiedRequest).pipe(tap(event => {
//     console.log(event);
//     if (event.type === HttpEventType.Response) {
//       console.log("Response arrived, body data: ");
//       console.log(event.body);
//     }
//   }))

// #multiple interceptors
// we can have multiple interceptors
// the order of the interceptors matters
// the first interceptor will be executed first
// we can also pass an array of interceptors to the providers array
// providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
// { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }], 