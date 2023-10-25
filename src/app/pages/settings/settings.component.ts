import {Component, OnInit} from '@angular/core';
import {ApiInfo} from '../../core/models';
import {DbService} from '../../services/fire-db/db.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	billNodes = ['airtime', 'airtimeCash', 'data', 'electricity', 'cable', 'transfer'];

	constructor(public db: DbService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.db.getApiSettings();
	}

	async updateChange($event, billNode) {
		if (billNode === 'billsBalance') {
			await this.db.updateApiSettings();
			await this.asp.alertMe('Updated', 'Balance updated successfully', 'success');
		} else {
			console.log('updated ' + billNode, $event.target.checked);
			this.db.apiInfo[billNode] = $event.target.checked;
			// console.log(this.db.apiInfo);
			await this.db.updateApiSettings();
			await this.asp.alertMe('Updated', billNode + ' updated successfully', 'success');
		}

	}

}
