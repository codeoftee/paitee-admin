import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersRoutingModule} from './users-routing.module';
import {DataTablesModule} from 'angular-datatables';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		UsersComponent,
		ProfileComponent
	],
	imports: [
		CommonModule, UsersRoutingModule, DataTablesModule, BsDropdownModule, FormsModule
	]
})
export class UsersModule {
}
