import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {freeSet} from '@coreui/icons';
import {AuthService} from './services/auth/auth.service';
import {ConnectivityService} from './services/conn/connectivity.service';
import {AlertServiceProvider} from './services/alert-service/alert-service';

@Component({
	// tslint:disable-next-line
	selector: 'body',
	templateUrl: './app.component.html',
	providers: [IconSetService],
})
export class AppComponent implements OnInit {
	constructor(
		public iconSet: IconSetService,
		private auth: AuthService, public router: Router, private connect: ConnectivityService,
		public asp: AlertServiceProvider
	) {
		// iconSet singleton
		iconSet.icons = {...freeSet};
	}

	async ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
		await this.asp.showSpinner();
		try {
			if (localStorage.getItem('jwt')) {
				this.auth.isLoggedIn = true;
			}
			const loggedIn = await this.auth.checkLogin();
			if (!loggedIn) {
				console.log('not loggedIn ', loggedIn);
				await this.router.navigate(['/login']);
				this.asp.hideSpinner();
			} else {
				try {
					await this.auth.loadProfile();
					setTimeout(() => {
						this.asp.hideSpinner();
					}, 6000);
				} catch (e) {
					await this.router.navigate(['/login']);
					this.asp.hideSpinner();
				}
			}
		} catch (e) {
			console.log('login error ', e);
			await this.router.navigate(['/login']);
			this.asp.hideSpinner();
		}
	}
}
