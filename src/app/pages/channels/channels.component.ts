import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DbService} from '../../services/fire-db/db.service';
import {Channels} from '../../core/models';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';

@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
	newApplet = {} as Channels;
	updatingApplet = {} as Channels;
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	constructor(public db: DbService, public asp: AlertServiceProvider) {
	}

	updateApplet(app: Channels) {
		this.updatingApplet = app;
		this.scrollToBottom();
	}

	async updateIt() {
		await this.asp.showSpinner('Updating..');
		await this.db.updateChannel(this.updatingApplet.id, this.updatingApplet);
		await this.asp.hideSpinner();
		this.asp.alertMe('', this.updatingApplet.title + ' updated', 'success');
	}

	async setVisibility(app: Channels) {
		app.hidden = !app.hidden;
		await this.db.updateChannel(app.id, app);
		this.asp.alertMe('', app.title + ' updated', 'success');
	}

	async deleteApplet(id) {
		await this.db.deleteApplet(id);
	}

	async setFeatured(app: Channels) {
		app.featured = !app.featured;
		await this.db.updateChannel(app.id, app);
		this.asp.alertMe('', app.title + ' updated', 'success');
	}

	async addApplet() {
		if (!this.newApplet.title) {
			this.asp.alertMe('Title required', 'Please enter applet tile');
		} else if (!this.newApplet.icon) {
			this.asp.alertMe('', 'Please enter icon link');
		} else if (!this.newApplet.app_version || !this.newApplet.route) {
			this.asp.alertMe('', 'Route and App version are required');
		} else {
			await this.asp.showSpinner('Saving...');
			this.newApplet.added = new Date().getTime();
			this.newApplet.featured = false;
			this.newApplet.hidden = true;
			this.newApplet.position = 0;
			this.newApplet.icon = './assets/svg/' + this.newApplet.icon.replace('./assets/svg/', '');
			console.log('saving...', this.newApplet);
			await this.db.addChannel(this.newApplet);
			await this.asp.hideSpinner();
			this.asp.alertMe('', this.newApplet.title + ' applet created successfully!');
		}
	}

	async ngOnInit() {
		await this.asp.showSpinner('Loading Applets...');
		await this.db.loadChannels();
		await this.asp.hideSpinner();
	}

	async listOrderChanged($event) {
		console.log('updating applets position');
		for (let i = 0; i < $event.length; i++) {
			$event[i].position = i;
			await this.db.updateChannel($event[i].id, $event[i]);
		}
	}

	scrollToBottom(): void {
		try {
			this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
		} catch (err) { }
	}
}
