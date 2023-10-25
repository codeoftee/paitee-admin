import {Component} from '@angular/core';
import {AlertServiceProvider} from '../../services/alert-service/alert-service';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	email: string;
	password: string;

	constructor(public asp: AlertServiceProvider, private conn: ConnectivityService, private auth: AuthService,
				private router: Router) {
	}


	async login() {
		if (!this.email || !this.password) {
			await this.asp.alertMe('Error!', 'Please enter login details', 'error');
		} else {
			await this.asp.showSpinner();
			const cred = {
				email: this.email,
				password: this.password
			};
			this.conn.sendPost(cred, '/admin/token').subscribe(async data => {
				console.log('login data ', data);
				if (data.done) {
					this.auth.emailLogin(cred).then(async () => {
						console.log('Logged in');
						await this.conn.saveJWT(data.token);
						await this.asp.hideSpinner();
						await this.router.navigate(['/home']);
						this.auth.isLoggedIn = true;
					}, (error) => {
						this.asp.hideSpinner();
						this.asp.alertMe('Error', error.message || 'Login failed, try again', 'error', false);
					});
				} else {
					// this.asp.alertMe('Login failed', data.message);
					await this.asp.alertMe('Login failed', data.message, 'error');
					await this.asp.hideSpinner();
				}
			}, error => {
				console.log('server login failed! ', error);
				this.asp.alertMe('Login failed', error.message, 'error');
				this.asp.hideSpinner();
			});
		}
	}
}
