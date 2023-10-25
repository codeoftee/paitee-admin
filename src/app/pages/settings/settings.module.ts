import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SwitchComponent} from '../../core/custom/switch/switch.component';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		data: {
			title: 'Settings'
		}
	}
];


@NgModule({
	declarations: [
		SettingsComponent,
		SwitchComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule
	]
})
export class SettingsModule {
}
