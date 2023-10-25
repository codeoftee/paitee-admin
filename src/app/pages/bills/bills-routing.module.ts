import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BillsComponent} from './bills.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Bills'
		},
		children: [
			{
				path: '',
				redirectTo: 'bills/airtime'
			},
			{
				path: ':bill',
				component: BillsComponent,
				data: {
					title: 'Bills Logs'
				}
			}/*,
			{
				path: 'airtime',
				component: AirtimeComponent,
				data: {
					title: 'Airtime'
				}
			},
			{
				path: 'mobile-data',
				component: MobileDataComponent,
				data: {
					title: 'Mobile Data'
				}
			},
			{
				path: 'airtime-cash',
				component: AirtimeCashComponent,
				data: {
					title: 'Airtime Cash'
				}
			},
			{
				path: 'cable-tv',
				component: TvComponent,
				data: {
					title: 'Cable Tv'
				}
			},
			{
				path: 'bank-transfer',
				component: BankTransferComponent,
				data: {
					title: 'Bank Transfers'
				}
			}*/
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BillsRoutingModule {}
