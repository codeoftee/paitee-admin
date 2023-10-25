import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../../services/alert-service/alert-service';
import {FailedPayments, Payments} from '../../../core/models';

@Component({
	selector: 'app-failed-payments',
	templateUrl: './failed-payments.component.html',
	styleUrls: ['./failed-payments.component.scss']
})
export class FailedPaymentsComponent implements OnInit, OnDestroy {

	dtTrigger: Subject<any> = new Subject<any>();
	bills: FailedPayments[] = [];
	payments: Payments[] = [];
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.failedPayments();
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	async failedPayments() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/failed-payments').subscribe((res) => {
			console.log('funds ', res);
			this.bills = res.bills;
			this.payments = res.payments;
			this.dtTrigger.next();
			this.asp.hideSpinner();
		}, error => {
			this.asp.hideSpinner();
			console.log(error);
			this.asp.alertMe('Error', error.message || 'Loading data failed', 'error');
		});
	}

}
