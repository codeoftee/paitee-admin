import {Component, OnInit} from '@angular/core';
import {UtilitiesService} from '../../services/utilities/utilities.service';
import {AdminService} from '../../services/admin/admin.service';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AuthService} from '../../services/auth/auth.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private auth: AuthService, private conn: ConnectivityService, public admin: AdminService,
				public utilities: UtilitiesService, public asp: AlertServiceProvider) {
	}

	ngOnInit() {
		if (!this.admin.stats.in_wallets) {
			this.loadStats();
		}
	}

	async loadStats() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/stats').subscribe((data) => {
			console.log('starts ', data);
			this.asp.hideSpinner();
			this.admin.stats = data;
		}, error => {
			this.asp.hideSpinner();
			console.log('stats error ', error);
		});
	}
}
