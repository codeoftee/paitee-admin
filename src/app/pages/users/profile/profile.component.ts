import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectivityService} from '../../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../../services/alert-service/alert-service';
import {Ads, Giveaways, Payments, UserProfile} from '../../../core/models';
import {Subject, Subscription} from 'rxjs';
import {UtilitiesService} from '../../../services/utilities/utilities.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
	uid: any;
	user = {} as UserProfile;
	fireUser = {} as UserProfile;
	payments: Payments[] = [];
	ads: Ads[] = [];
	giveaways: Giveaways[] = [];
	dtTrigger: Subject<any> = new Subject<any>();
	update_amount: number;
	update_ref: string;
	userSub: Subscription;

	constructor(private activatedRoute: ActivatedRoute, private conn: ConnectivityService,
				public asp: AlertServiceProvider, public utilities: UtilitiesService,
				private auth: AuthService) {
	}

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((pm) => {
			console.log(pm.get('id'));
			this.uid = pm.get('id');
			this.user = {} as UserProfile;
			this.loadUser(this.uid);
		});
		this.update_ref = this.utilities.randomString(7);
	}

	async loadUser(uid) {
		await this.asp.showSpinner();
		this.conn.sendGet('/admin/user/' + uid).subscribe((res) => {
			console.log('user info ', res);
			this.user = res.user;
			this.payments = res.payments;
			this.giveaways = res.giveaways;
			this.ads = res.ads;
			this.dtTrigger.next();
			this.asp.hideSpinner();
			this.userSub = this.auth.loadUser(this.user.uid).subscribe((user) => {
				this.fireUser = user;
				console.log('fire user ', user);
			});
		}, err => {
			console.log(err);
			this.asp.hideSpinner();
			this.asp.alertMe('Error', 'Error occurred while loading user');
		});
	}

	approveIt(item, which = 'giveaway') {

	}

	disableIt(item, which = 'giveaway') {

	}

	deleteIt(item, which = 'giveaway') {

	}

	updateBal(update) {
		if (!this.update_amount || this.update_amount < 1) {
			this.asp.alertMe('Invalid', 'Please enter amount.', 'warning');
			return;
		}
		if (!this.update_ref || this.update_ref.length < 5) {
			this.asp.alertMe('Invalid', 'Reference too short', 'warning');
			return;
		}
		if (update === 'credit' && confirm('Proceed to CREDIT ' + this.user.username + ' with N' + this.update_amount + '?')) {
			// credit
			this.commitBalance('credit');
		} else if (confirm('Proceed to DEBIT ' + this.user.username + ' N' + this.update_amount + '?')) {
			// debit
			this.commitBalance('debit');
		}
	}

	commitBalance(update) {
		const data = {
			uid: this.uid,
			amount: this.update_amount,
			update
		};
		this.conn.sendPost(data, '/admin/update-user-bal').subscribe((res) => {
			console.log('update bal res ', res);
			if (res.done) {
				this.asp.alertMe('Success', res.message, 'success');
			} else {
				this.asp.alertMe('Failed', res.message, 'error');
			}
		});
	}

	sendEmail() {

	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
		if (this.userSub) {
			this.userSub.unsubscribe();
		}
	}
}
