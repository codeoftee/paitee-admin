import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ChannelsComponent} from './channels.component';



const routes: Routes = [
	{
		path: '',
		component: ChannelsComponent,
		data: {
			title: 'Channels'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChannelsRoutingModule { }
