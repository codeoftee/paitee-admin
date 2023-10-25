import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectivityService} from '../../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../../services/alert-service/alert-service';
import {WalletCredit} from '../../../core/models';
import {Subject} from 'rxjs';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
	cardPayments: WalletCredit[] = [];
	dtTrigger: Subject<any> = new Subject<any>();
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.loadPayments();
	}

	async loadPayments() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/bills/wallet').subscribe((res) => {
			console.log('card payments ', res);
			if (res.done) {
				this.cardPayments = res.data;
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
