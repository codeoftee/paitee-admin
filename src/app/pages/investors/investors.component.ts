import {Component, OnInit} from '@angular/core';
import {Investors} from '../../core/models';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';

@Component({
	selector: 'app-investors',
	templateUrl: './investors.component.html',
	styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {
	investors: Investors[] = [];

	dtTrigger: Subject<any> = new Subject<any>();
	newInvestor = {} as Investors;
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.loadInvestors();
	}

	async loadInvestors() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/list-investors').subscribe((data) => {
			console.log('investors ', data);
			this.investors = data.investors;
			this.dtTrigger.next();
			this.asp.hideSpinner();
		}, error => {
			this.asp.hideSpinner();
			console.log('error loading investors ', error);
			this.asp.alertMe('Error', 'Error loading investors!', 'error');
		});
	}

	async addInvestor() {
		await this.asp.showSpinner('Loading');
		this.conn.sendPost(this.newInvestor, '/admin/create-investor').subscribe((res) => {
			console.log('add investor res', res);
			this.asp.hideSpinner();
			this.asp.alertMe('Done ', this.newInvestor.name + ' added successfully.');
			this.loadInvestors();
		}, error => {
			this.asp.hideSpinner();
			this.asp.alertMe('Error', 'Error adding investor', 'error');

			console.log('error adding investor ', error);
		});
	}
}
