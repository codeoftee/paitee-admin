import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardComponent} from './card/card.component';
import {VirtualAccountsComponent} from './virtual-accounts/virtual-accounts.component';
import {DirectTransferComponent} from './direct-transfer/direct-transfer.component';
import {FailedPaymentsComponent} from './failed-payments/failed-payments.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Payments'
		},
		children: [
			{
				path: '',
				redirectTo: 'card'
			},
			{
				path: 'card',
				component: CardComponent,
				data: {
					title: 'Card Payments'
				}
			},
			{
				path: 'virtual',
				component: VirtualAccountsComponent,
				data: {
					title: 'Virtual Accounts'
				}
			},
			{
				path: 'transfers',
				component: DirectTransferComponent,
				data: {
					title: 'Direct Transfers'
				}
			},
			{
				path: 'failed',
				component: FailedPaymentsComponent,
				data: {
					title: 'Failed Payments'
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PaymentsRoutingModule {}
