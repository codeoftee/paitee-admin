import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvestorsComponent} from './investors.component';
import {DataTablesModule} from 'angular-datatables';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


@NgModule({
	declarations: [InvestorsComponent],
	imports: [
		CommonModule,
		DataTablesModule,
		RouterModule.forChild([
			{
				path: '',
				component: InvestorsComponent
			}
		]),
		FormsModule
	]
})
export class InvestorsModule {
}
