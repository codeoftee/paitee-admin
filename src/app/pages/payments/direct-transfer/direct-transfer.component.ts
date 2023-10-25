import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../../services/alert-service/alert-service';
import {DirectTransfers} from '../../../core/models';

@Component({
	selector: 'app-direct-transfer',
	templateUrl: './direct-transfer.component.html',
	styleUrls: ['./direct-transfer.component.scss']
})
export class DirectTransferComponent implements OnInit, OnDestroy {

	DirectTransfers: DirectTransfers[] = [];
	dtOptions = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit() {
		this.dtOptions = {
			pageLength: 100
		};
		this.loadDf();
	}

	approveIt(ref) {
		this.asp.showSpinner('approving ' + ref);
		this.conn.sendGet('/admin/approve_fund/' + ref).subscribe((res) => {
			console.log('approve res ', res);
			this.asp.hideSpinner();
			if (res.done) {
				this.asp.alertMe('Done', res.message, 'success', false);
			} else {
				this.asp.alertMe('Error!', res.message, 'error');
			}
		}, error => {
			this.asp.hideSpinner();
			this.asp.alertMe('Error!', error.message || 'Connection error.', 'error');
		});
	}

	cancelIt(ref) {
		// this.asp.showSpinner('approving');
		this.asp.alertMe('Sorry!', 'Cannot cancel at the moment.');
	}

	deleteIt(ref) {
		this.asp.alertMe('Sorry!', 'Cannot delete at the moment.');
	}

	async loadDf() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/direct-funds/all').subscribe((res) => {
			console.log('funds ', res);
			this.DirectTransfers = res.data;
			this.dtTrigger.next();
			this.asp.hideSpinner();
		}, error => {
			this.asp.hideSpinner();
			console.log(error);
			this.asp.alertMe('Error', error.message || 'Loading data failed', 'error');
		});
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

}
