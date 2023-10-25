import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
	providedIn: 'root'
})

export class AlertServiceProvider {
	loadingText = 'Loading..';
	startupText: BehaviorSubject<string>;
	texts: any;
	unread_chats: number;
	unread_settings: number;
	alerts: Array<{ type: string, msg: string, dismissible: boolean, topic: string, id: number, timeout: number }> = [];
	alertTimeOut = 5000;

	constructor(private spinner: NgxSpinnerService) {

		this.texts = [
			'Startup drill',
			'Initializing',
			'Starting up',
			'Please wait',
			'House keeping',
			'Connecting',
			'Circle-plot',
			'Just a sec',
			'One moment',
			'How \'u doin'
		];
		const randomNumber = Math.floor(Math.random() * this.texts.length);
		this.startupText = new BehaviorSubject(this.texts[randomNumber]);

		this.unread_chats = 3;
		this.unread_settings = 1;
	}

	setStartupText(val) {
		this.startupText.next(val);
	}

	getStartupText() {
		const randomNumber = Math.floor(Math.random() * this.texts.length);
		this.startupText = new BehaviorSubject(this.texts[randomNumber]);
		return this.startupText.asObservable();
	}

	async showSpinner(msg = 'Loading') {
		this.loadingText = msg;
		return this.spinner.show();
	}

	async hideSpinner() {
		return this.spinner.hide();
	}

	async alertMe(topic: string, msg: string, type = 'info', close: boolean = true) {
		if (type === 'error') {
			type = 'danger';
		}

		const data = {topic, msg, type, dismissible: close, id: new Date().getTime(), timeout: close ? 10000 : 30000};
		this.alerts.push(data);
	}

	removeAlert(id) {
		this.alerts = this.alerts.filter((item) => item.id !== id);
	}

	/*async prepLoader(text= 'Please wait..') {
		let loader = this.loadingCtrl.create({
			spinner: 'crescent',
			message: text,
		});

		return await loader;
	}

	async showToast(text: string, closeAt = null, placement = null) {
		closeAt = closeAt || 5000;
		placement = placement || 'bottom';

		const toast = await this.toastCtrl.create({
			message: text,
			position: placement,
			duration: closeAt,
			buttons: [
				{
					icon: 'close',
					role: 'cancel'
				}
			]
		});

		return toast.present();
	}*/


	/*conError(msg = '') {
		if (msg === '' || !msg) {
			msg = 'Unable to complete request at the moment. Please check internet connection and try again.';
		}
		this.alertMe('Error Occurred', msg
			, 'error', 'CLOSE');
	}*/

	/*uploadError() {
		this.alertMe('Upload error', 'Error occurred while uploading file. Please check internet connection and try again later.'
			, 'error', 'CLOSE');
	}
*/
}
