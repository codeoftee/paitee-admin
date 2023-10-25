import {Component, OnDestroy, OnInit} from '@angular/core';
import {VirtualTransfers} from '../../../core/models';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../../services/alert-service/alert-service';

@Component({
	selector: 'app-virtual-accounts',
	templateUrl: './virtual-accounts.component.html',
	styleUrls: ['./virtual-accounts.component.scss']
})
export class VirtualAccountsComponent implements OnInit, OnDestroy {
	virtualPayments: VirtualTransfers[] = [];
	dtTrigger: Subject<any> = new Subject<any>();
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.loadVirtual();
	}

	async loadVirtual() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/payment/virtual').subscribe((res) => {
			console.log('card payments ', res);
			if (res.done) {
				this.virtualPayments = res.data;
				this.dtTrigger.next();
			}
			this.asp.hideSpinner();
		}, err => {
			console.log(err);
			this.asp.hideSpinner();
		});
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
