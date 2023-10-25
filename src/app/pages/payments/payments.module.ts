import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {DirectTransferComponent} from './direct-transfer/direct-transfer.component';
import {VirtualAccountsComponent} from './virtual-accounts/virtual-accounts.component';
import {PaymentsRoutingModule} from './payments-routing.module';
import {DataTablesModule} from 'angular-datatables';
import {FailedPaymentsComponent} from './failed-payments/failed-payments.component';


@NgModule({
	declarations: [
		CardComponent,
		DirectTransferComponent,
		VirtualAccountsComponent,
		FailedPaymentsComponent
	],
	imports: [
		CommonModule,
		PaymentsRoutingModule,
		DataTablesModule
	]
})
export class PaymentsModule {
}
