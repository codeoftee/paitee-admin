import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {
	AccountBalance,
	BillSettings,
	UserProfile
} from '../../core/models';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private sub: any;
	profileSub: Subscription;
	accountSub: Subscription;
	currentUser: firebase.User;
	private readonly authState: Observable<firebase.User>;
	profileDoc: AngularFirestoreDocument<UserProfile>;
	accountDoc: AngularFirestoreDocument<AccountBalance>;

	settingsCol: AngularFirestoreCollection<BillSettings>;

	userProfile = {} as UserProfile;
	uid: string;
	activeProfile = {} as UserProfile;
	viewedProfiles: UserProfile[] = [];
	isLoggedIn: boolean = false;

	constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
		this.authState = this.afAuth.authState;
		this.settingsCol = this.afs.collection('app-settings');
	}

	checkLogin() {
		return new Promise((resolve, reject) => {
			this.sub = this.authState.subscribe(user => {
				if (user) {
					this.currentUser = user;
					this.uid = user.uid;
					this.isLoggedIn = true;
					console.log('auth logged in as ', user.uid);
					this.profileDoc = this.afs.doc<UserProfile>('/users/' + user.uid);
					this.accountDoc = this.afs.collection('accounts').doc(user.uid);
					resolve(true);
				} else {
					console.log('No user!');
					resolve(false);
					this.isLoggedIn = false;
				}
			}, err => {
				this.isLoggedIn = false;
				reject(err);
			});
		});
	}

	loadProfile() {
		return new Promise((resolve, reject) => {
			this.profileSub = this.profileDoc.valueChanges().subscribe((data) => {
				console.log('admin info ', data);
				if (data) {
					this.userProfile = data;
					// get jwt
					resolve(this.userProfile);
				}
			}, error1 => {
				console.log('getting profile error ', error1);
				reject(error1);
			});
		});
	}

	async pinSet() {
		return this.profileDoc.update({has_pin: true});
	}

	emailLogin(cred) {
		return this.afAuth.signInWithEmailAndPassword(cred.email, cred.password);
	}

	async signOut() {
		this.currentUser = null;
		this.isLoggedIn = false;
		if (this.profileSub) {
			this.profileSub.unsubscribe();
		}
		if (this.accountSub) {
			this.accountSub.unsubscribe();
		}

		await localStorage.setItem('jwt', null);
		return this.afAuth.signOut();
	}

	passwordReset(email) {
		return new Promise((resolve, reject) => {
			firebase.auth().sendPasswordResetEmail(email).then(() => {
				resolve({success: true});
			}).catch((err) => {
				reject(err);
			});
		});
	}

	updatePassword(oldPass, newPassword) {
		return new Promise((resolve, reject) => {
			const cred = {
				email: this.currentUser.email,
				password: oldPass
			};
			this.emailLogin(cred).then((res) => {
				res.user.updatePassword(newPassword).then(() => {
					resolve({done: true});
				}, (err) => {
					reject(err);
				});
			}, err => {
				reject(err);
			});
		});
	}

	loadUser(uid): Observable<UserProfile> {
		return this.afs.collection<UserProfile>('users').doc(uid).valueChanges();
	}

	makeId() {
		return this.afs.createId();
	}

	/*randomId() {
	  let id = this.randomString(6) + this.userProfile.uid;
	  return id.substring(0, 10);
	}*/
	findUserByWid(wid) {
		return this.afs.collection<UserProfile>('users', ref => ref.where('accountNumber', '==', wid));
	}

	findUserByPhone(phone) {
		return this.afs.collection<UserProfile>('users', ref => ref.where('phone', '==', phone));
	}

	findUser(field, query) {
		return this.afs.collection<UserProfile>('users', ref => ref.where(field, '==', query));
	}

	getProfile(uid): Observable<UserProfile> {
		return this.afs.collection('users').doc<UserProfile>(uid).valueChanges();
	}

	getProfileOnce(uid) {
		return this.afs.collection('users').doc<UserProfile>(uid).ref.get();
	}

	findWallet(wid) {
		return this.afs.collection('wallets').doc(wid);
	}

	addWalletHistory(uid, history) {
		return this.afs.collection('users').doc(uid).collection('transactions').doc(history.ref).set(history);
	}
}
