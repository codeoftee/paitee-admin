import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {FlutterDataBundles, Gift} from '../../core/models';
import {DbService} from '../../services/fire-db/db.service';
import {UtilitiesService} from '../../services/utilities/utilities.service';

@Component({
	selector: 'app-gifts',
	templateUrl: './gifts.component.html',
	styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit, OnDestroy {
	$gifts: Observable<Gift[]>;
	newGift = {} as Gift;
	giftTypes = ['airtime' , 'mobile_data' , 'tv' , 'cash' , 't-shirt'];
	providers = ['mtn' , 'glo' , '9mobile' , 'airtel' , 'paitee', 'dstv', 'gotv', 'startimes'];
	data_bundles: FlutterDataBundles[];
	tv_bundles: FlutterDataBundles[];
	dtTrigger: Subject<any> = new Subject<any>();
	refreshHour: number;
	constructor(private conn: ConnectivityService, public asp: AlertServiceProvider, private activatedRoute: ActivatedRoute,
				private router: Router, public db: DbService, private utilities: UtilitiesService) {
	}

	async ngOnInit() {
		this.$gifts = this.db.getGifts();

		this.loadBundles();
		this.dtTrigger.next();
		this.refreshHour = 0;
		this.db.loadAdminSettings();
	}

	ngOnDestroy() {
		this.dtTrigger.unsubscribe();
	}
	async deleteGift(id) {
		await this.db.removeGift(id);
		console.log('deleted ', id);
	}
	dataSelected(which, $event) {
		// console.log($event);
		let selectedBundle: FlutterDataBundles;
		if (which === 'tv') {
			selectedBundle = this.tv_bundles.filter((item) => item.item_code === $event.target.value)[0];
		} else {
			selectedBundle = this.data_bundles.filter((item) => item.item_code === $event.target.value)[0];
		}
		if (selectedBundle) {
			this.newGift.og_price = selectedBundle.amount;
			this.newGift.item_value = '';
			this.newGift.name = selectedBundle.name + ' GIFT';
			this.newGift.description = 'This gift card contains ' + selectedBundle.name + '.';
			this.newGift.price = selectedBundle.amount;
		}
	}

	async createGift() {
		this.newGift.owner = 'paitee';
		this.newGift.created = new Date().getTime();
		this.newGift.updated = this.newGift.created;
		this.newGift.deleted = false;
		this.newGift.ref = this.utilities.randomString(10);

		let ready = null;
		for (const x in this.newGift) {
			if (this.newGift.hasOwnProperty(x)) {
				console.log(x + ' -> ' + this.newGift[x]);
				ready = this.newGift[x] && this.newGift[x] !== '';
			}
		}
		if (ready) {
			await this.asp.showSpinner('Creating');
			await this.db.makeGift(this.newGift);
			await this.asp.hideSpinner();
			this.asp.alertMe('Done', 'Card created successfully!', 'success');
		} else {
			this.asp.alertMe('Input error ', 'Failed to create gift card, check details', 'error');
		}

	}

	loadBundles() {
		console.log('getting bundles');
		this.conn.sendGet('/bills/rave-bundles/data').subscribe(async res => {
			console.log('bundles ', res);
			// this.bundles[bundle] = res.bundles.filter((item) => item.country == 'NG');
			this.data_bundles = res.bundles.filter((item) => item.country == 'NG');
		}, err => {
			console.log('error loading bundle ..', err);
		});

		this.conn.sendGet('/bills/rave-bundles/cable').subscribe(async res => {
			console.log('cable bundles ', res);
			// this.bundles[bundle] = res.bundles.filter((item) => item.country == 'NG');
			this.tv_bundles = res.bundles.filter((item) => item.country == 'NG');
		}, err => {
			console.log('error loading bundle ..', err);
		});
	}

	async updateRefreshTime() {
		await this.asp.showSpinner('Updating');
		this.conn.sendGet('/admin/gifts-refresh-time/' + this.refreshHour).subscribe((res) => {
			console.log('Refresh res ', res);
			this.asp.hideSpinner();
			this.asp.alertMe('Done', res.message);
		}, error =>  {
			console.log(error);
			this.asp.hideSpinner();
		});
	}

	async clearCards() {
		await this.db.clearGifts();
		await this.asp.alertMe('Done', 'Cards cleared', 'success');
	}

}
