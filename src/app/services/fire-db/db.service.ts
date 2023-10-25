import {Injectable} from '@angular/core';
import {ApiInfo, Channels, Gift} from '../../core/models';
import {AngularFirestore} from '@angular/fire/firestore';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
	providedIn: 'root'
})
export class DbService {

	channels: Channels[] = [];
	featuredChannels: Channels[] = [];
	adminSettings: {refreshTime: number};

	apiInfo = {} as ApiInfo;
	constructor(private afs: AngularFirestore, private utilities: UtilitiesService) {
		this.adminSettings = {refreshTime: 0};
	}

	loadAdminSettings() {
		return this.afs.collection<any>('app-settings').doc('admin').valueChanges().subscribe((res) => {
			this.adminSettings = res;
		});
	}
	async clearGifts() {
		this.afs.collection('gifts').ref.get().then((snaps) => {
			snaps.forEach(async (gift) => {
				await gift.ref.delete();
			});
		});
	}
	getApiSettings() {
		this.afs.collection('app-settings').doc<ApiInfo>('billsApi').valueChanges().subscribe((data) => {
			this.apiInfo = data;
		});
	}

	updateApiSettings() {
		return this.afs.collection('app-settings').doc('billsApi').update(this.apiInfo);
	}
	getGifts() {
		return this.afs.collection<Gift>('gifts', ref => ref.orderBy('updated', 'desc')).valueChanges({idField: 'id'});
	}
	removeGift(id) {
		return this.afs.collection('gifts').doc(id).delete();
	}
	makeGift(data: Gift) {
		return this.afs.collection('gifts').doc(data.ref).set(data);
	}

	async loadChannels() {
		await this.afs.collection<Channels>('channels', ref => ref.orderBy('position')).valueChanges({idField: 'id'}).subscribe((data) => {
			if (data && data.length) {
				console.log('firestore channels ', data);
				this.channels = data;
				this.featuredChannels = this.channels.filter((item) => item.featured);
			}
		});
	}

	async addChannel(data: Channels) {
		return await this.afs.collection('channels').add(data);
	}

	async updateChannel(id: string, data: Channels) {
		return await this.afs.collection('channels').doc(id).update(data);
	}

	async deleteApplet(id: string) {
		return await this.afs.collection('channels').doc(id).delete();
	}
}
