import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChannelsRoutingModule} from './channels-routing.module';
import {ChannelsComponent} from './channels.component';
import {NgxSortableModule} from 'ngx-sortable';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';


@NgModule({
	declarations: [
		ChannelsComponent
	],
    imports: [
        CommonModule,
        ChannelsRoutingModule,
        NgxSortableModule,
        FormsModule,
        BsDropdownModule
    ]
})
export class ChannelsModule {
}
