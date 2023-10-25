import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GiftsComponent} from './gifts.component';
import {RouterModule, Routes} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: GiftsComponent,
		data: {
			title: 'Gifts'
		}
	}
];

@NgModule({
	declarations: [
		GiftsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		DataTablesModule,
		FormsModule
	]
})
export class GiftsModule {
}
