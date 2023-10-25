import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillsRoutingModule} from './bills-routing.module';
import {BillsComponent} from './bills.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
	declarations: [
		BillsComponent
	],
	imports: [
		CommonModule, BillsRoutingModule, DataTablesModule
	]
})
export class BillsModule {
}
