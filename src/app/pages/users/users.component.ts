import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from '../../core/models';
import {Subject} from 'rxjs';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

	users: UserProfile[] = [];
	dtTrigger: Subject<any> = new Subject<any>();
	dtOptions = {};
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider) {
	}

	ngOnInit(): void {
		this.dtOptions = {
			pageLength: 100
		};
		this.loadUsers();
	}

	async loadUsers() {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/users').subscribe((res) => {
			console.log('users ', res);
			if (res.done) {
				this.users = res.data;
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
