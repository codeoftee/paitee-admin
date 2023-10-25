import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Bill} from '../../core/models';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';
declare var DataTable;
declare var $;
@Component({
	selector: 'app-bills',
	templateUrl: './bills.component.html',
	styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit, OnDestroy {
	activeBill: string;
	bills: Bill[] = [];
	dtTrigger: Subject<any> = new Subject<any>();
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider, private activatedRoute: ActivatedRoute,
				private router: Router) {
	}

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((pm) => {
			console.log('current bill', pm.get('bill'));
			this.activeBill = pm.get('bill');
			this.loadBills();
		});

		// detect url change
		// @ts-ignore
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationStart) {
				// Show loading indicator
				console.log('going to ', event.url);
				// @ts-ignore
				const table = $('#billTable').DataTable();
				table.destroy();
			}

			if (event instanceof NavigationEnd) {
				// Hide loading indicator
			}

			if (event instanceof NavigationError) {
				// Hide loading indicator

				// Present error to user
				console.log(event.error);
			}
		});
	}

	async loadBills() {
		await this.asp.showSpinner('Getting ' + this.activeBill);
		this.conn.sendGet('/admin/bills/' + this.activeBill).subscribe((res) => {
			console.log('bills ', res);
			if (res.done) {
				this.bills = res.data;
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
