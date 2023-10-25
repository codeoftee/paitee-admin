import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConnectivityService {
	jwt: string;
	private baseUrl = 'https://paitee.cloudifymedia.com/v1';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	constructor(private http: HttpClient) {
		this.saveJWT(null);
	}

	sendPost(data, link) {
		return this.http.post<any>(this.baseUrl + link, JSON.stringify(data), {headers: this.headers});
	}

	sendGet(endpoint) {
		return this.http.get<any>(this.baseUrl + endpoint, {headers: this.headers});
	}

	async saveJWT(token: string | null) {
		if (token == null) {
			token = localStorage.getItem('jwt');
		}
		if (token) {
			this.jwt = token;
			console.log('saved token is ', this.jwt);
			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.jwt
			});
			return localStorage.setItem('jwt', token);
		}
	}
}
