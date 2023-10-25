import {DocumentReference} from '@angular/fire/firestore';

export interface Bill {
	id: number;
	uid: string;
	amount: number;
	bill_type: string;
	order_id: string;
	ref: string;
	status_code: string;
	order_remark: string;
	recipient: string;
	charges: number;
	gateway_charges: number;
	commission: number;
	payment_mode: string;

	package: string;

	gateway_ref: string;
	paid: number;
	processed: string;
	status: string;
}

export interface FailedPayments {
	id: number;
	processed: string;
	refunded: 'yes' | 'no';
	request: object;
	response: object;
	uid: string;
}

export interface Payments {
	id: number;
	uid: string;
	amount: number;
	ref: string;
	mode: string;
	discount: number;
	charges: number;
	status: string;
	purpose: string;
	way: string;
	processed: string;
	new_balance: number;
	prev_balance: number;
	pay_mode?: string;

}

export interface VirtualTransfers {
	id: number;
	email: string;
	uid: string;
	amount: number;
	ref: string;
	mode: string;
	origin: string;
	status: string;
	gateway_ref: string;
	processed: string;
}

export interface DirectTransfers {
	id: number;
	uid: string;
	amount: number;
	ref: string;
	pop: string;
	created: string;
	status: string;
}

export interface CardPayments {
	id: number;
	uid: string;
	amount: number;
	ref: string;
	mode: string;
	status: string;
	hooked: string;
	gateway_ref: string;
	gateway_token: string;
	card_last_four: string;
	card_id: string;
	processed: string;

}

export interface WalletCredit {
	id: number;
	uid: string;
	amount: number;
	ref: string;
	prev_balance: string;
	new_balance: string;
	processed: string;
	authorization: {
		account_name: string;
		authorization_code: string;
		bank: string;
		bin: string;
		brand: string;
		card_type: string;
		channel: string;
		country_code: string;
		exp_month: string;
		exp_year: string;
		last4: string;
		receiver_bank: string;
		receiver_bank_account_number: string;
		reusable: boolean;
		signature: string;
	};
	status: string;
	hooked: string;
}

export interface Stats {
	users: number;
	active_user: number;
	today_users: number;
	today_pay_in: number;
	today_pay_out: number;
	total_pay_in: number;
	total_pay_out: number;
	in_wallets: number;
	ads_count: number;
	giveaways_count: number;
	payments_count: number;
}

export interface Bank {
	active: boolean;
	code: number;
	country: string;
	currency: string;
	gateway: string;
	id: number;
	is_deleted: any;
	longcode: number;
	name: string;
	slug: string;
	type: string;
}

export interface Posts {
	posted?: string;
	textPost?: string;
	pid?: string;
	cid?: string;
	likes?: any;
	likesCount?: number;
	likeState?: string;
	iconName?: string;
	comment_count?: number;
	profile?: UserProfile;
	attachments?: Attachment[];
}

export interface Ev {
	name: string;
	description: string;
	membersCount: number;
	capacity: number;
	creator: string;
	created: any;
	cid: string;
	category: string;
	isPrivate: boolean;
	membershipType: string;
	lastPost: string;
	poster: string;
	postCount: number;
	commentCount: number;
	fileCount: number;
	regularTicket: number;
	vipTicket: number;
	vvipTicket: number;
	eventDate: string;
	eventEndDate: string;
	startTime: string;
	endTime: string;
	lat: number;
	lng: number;
	address: string;
}

export interface UserProfile {
	id: number;
	email: string;
	uid: string;
	phone?: string;
	gender: string;
	dp: string;
	username: string;
	firstName?: string;
	lastName?: string;
	dob?: string;
	state?: string;
	app_version?: number;
	accountNumber: string;
	balance: number;
	walletUpdated?: boolean;
	joined?: number;
	has_pin?: boolean;
	interests?: any[];
	verified?: boolean;

	bio?: string;

	lat: any;
	lng: any;
	fire_token: string;
	lastSeen?: number;
	refers: number;
	refers_tp: number;
	created?: string;
	modified?: string;
}

export interface AccountBalance {
	accountNumber: string;
	balance: number;
	totalDeposit: number;
	totalSpent: number;
	uid: string;
	pin?: any;
	bvn?: number;
	bankName?: string;
	generated?: string;
	accountType: string;
	discount: number;
	airtime_discount: boolean;
	accountNumberRef?: string;
}

export interface NewTransfer {
	amount: number;
	recipient_name: string;
	recipient_account: string;
	transaction_type: string;
	bank: Bank;
	description: string;
	transfer_to: string;
	recipient_uid?: string;
	ref?: string;
	charges?: number;
}

export interface AccountTypes {
	name: string;
	max_in: number;
	min_in: number;
}

export interface Attachment {
	id?: string;
	filename: string;
	imgPath: string;
	filePath: any;
	fileType: string;
	fileSize?: number;
	dateTime: number;
	downloaded?: boolean;
}

export interface SlideShows {
	img: string;
	id: string;
	title: string;
	item_id?: string;
}

export interface Category {
	title: string;
	icon: string;
	offlineIcon: string;
	category?: string;
	id?: number;
	position: number;
	show?: boolean;
}

export interface AdsResult {
	ads: Ads[];
	done: boolean;
	next: number;
	has_next: boolean;
	found: number;
}

export interface Ads {
	uid?: string;
	id?: number;
	adType: string;
	title: string;
	description: string;
	price: number;
	price2?: number;
	categories?: string;
	categories_id?: string;
	industry?: string;
	negotiable: string;
	address: string;
	state?: string;
	city?: string;
	itemType?: string;
	lat?: number;
	lng?: number;
	phone: string;
	images: any;
	// thumbs?: any;
	storage?: string;
	ram?: string;
	brand?: string;
	model?: string;
	color?: string;
	size?: string;
	gender?: string;
	os?: string;
	year?: string;
	condition?: string;
	qualification?: string;
	status?: string;
	created?: number | string;
	created_timestamp?: string;
	edited?: number;
	promoted?: string;
	views?: number;
	owner?: UserProfile;

	cats_changed?: boolean;
	realEstate?: RealEstate;
	meta_data?: string;
}

export interface RealEstate {
	property_type: 'building' | 'land and building' | 'land';
	rooms: number;
	toilets: number;
	tiled: string;
	fenced: string;
	water: string;
	electricity: string;
	rent: number;
	package: number;
	quantity: string;
	area: string;
}

export interface Settings {
	pinForWallet: boolean;
	pinForIv: boolean;
	pinForVendor: boolean;
	unlocked: boolean;
	activePage: any;
	newPin: any;
}

export interface DataBundle {
	pid: string;
	duration: string;
	volume: string;
	amount: number;
}

export interface DebitCard {
	id?: string;
	name: string;
	brand: string;
	numbers: string;
	cvv: string;
	eMonth: string;
	eYear: string;
	usage: number;
	added: number;
	lastUse?: string;
	bank?: string;
	pin?: string;

	title?: string;
}

export interface ChatMessage {
	id: string;
	uid: string;
	receiver_id: string;
	sent: number | string;
	status: string;
	message: string;
	attachment?: string;
	attachment_pending?: boolean;
}

export interface ChatList {
	receiver: UserProfile;
	lastMessage: string;
	sent: string | number;
	unread: number;
	has_attachment?: boolean;
}

export interface TransactionHistory {
	uid: string;
	amount: number;
	processed: any;
	stat: string;
	ref: string;
	t_type: string;
	memo: string;
	channel: string;
	payment: string;
	topic: string;
	recipient?: string;
	sender?: string;
	discount?: number;
	charges?: number;
	completed?: boolean;
}

export interface Recipient {
	account_name: string;
	account_number: string;
	dp?: string;
	uid?: string;
	transfer_to: string;
	bank_name?: string;
}

export interface Item {
	id: string;
	ref: DocumentReference;
	data: Ads;
}

export interface StreetClass {
	cid?: string;
	active?: string;
	title?: string;
	info?: string;
	description?: string;
	uid?: string;
	category?: string;
	created?: any;
	membersCount?: number;
	isPrivate?: boolean;
	membershipCost?: number;
	membershipSub?: number;
	membershipType?: string;
	lastPost?: string;
	logo?: string;
	postCount?: number;
	requirements?: string;
	duration?: string;
	isMember?: boolean;
	adminProfile?: UserProfile;
	ratings?: Rating[];
	ratingCount?: number;
	ratingPoint?: number;
	trial?: number;
}

export interface ClassPreview {
	cid: string;
	owner: string;
	joined: number | string;
	classInfo?: StreetClass;
}

export interface ClassPost {
	id?: string;
	title: string;
	images?: any[];
	videos?: VideoFile[];
	posted: any;
	post_date?: any;
	videoLinks?: any[];
	details: string;
	detailsText?: string;
	cid?: string;
	uid?: string;
	commentCount?: number;
	likeCount?: number;
	likeState?: string;
	iconName?: string;
	comments?: PostComment[];
}

export interface ClassPayments {
	id: number;
	cid: string;
	uid: string;
	joined: string;
	ref: string;
	amount_paid: number;
	settlement: string;
	settled_on: string;
	status: string;
	profile?: UserProfile;
}

export interface PostOutline {
	cid: string;
	title: string;
	posted: string;
	likeCount: number;
	commentCount: number;
}

export interface PostComment {
	id?: string;
	uid: string;
	pid: string;
	text: string;
	posted: string | number;
	profile?: UserProfile;
	likeCount?: number;
	likeState?: string;
	iconName?: string;
}

export interface VideoFile {
	file_name?: string;
	native_url?: string;
	download_uri?: string;
	uploaded: boolean;
	duration?: number | string;
	thumb: string;
	native_thumb?: string;
	file_uri?: string;
}

export interface UploadedFiles {
	file_name: string;
	download_uri: string;
	id: string;
}

export interface Giveaways {
	id: number;
	uid: string;
	title: string;
	budget: number;
	spent: number;
	charges: number;
	max_users: number;
	item_type: string;
	prize: string;
	gid: string;
	status: string;
	timestamp: string;
	saved: string;
}

export interface GiveAwayData {
	id: string;
	title: string;
	type: 'airtime' | 'cash' | 'item';
	description: string;
	method: string;
	eligibility: string;
	required_accounts: any[
		/*'facebook',
		'twitter',
		'phone',
		'linkedIn',
		'uApp',
		'email',
		'instagram',
		'provider',
		'full_name',
		'iuc',
		'tv_provider'*/
		];
	prize: any;
	closing: string;
	posted: any;
	logo?: string;
	interested?: boolean;

	max: number;

	sponsor: string;
	task_type: 'engage_post' | 'follow_account' | 'download_item' | 'take_survey' | 'visit_page' | 'stream' | 'none' | 'share';
	task_link: string;

	status: 'pending' | 'active' | 'completed' | 'rejected' | 'processing';
	rejection?: string;
	charges?: number;
	budget?: number;
	spent?: number;
	applicants?: number;
	beneficiaries?: number;
	updated?: string;
	ref?: string;
	completed_time?: string;

	expiry?: number;

	uid: string;

}

export interface ExternalAccount {
	facebook?: string;
	twitter?: string;
	phone?: string;
	linkedIn?: string;
	uApp?: string;
	email?: string;
	instagram?: string;
	provider?: string;
	full_name?: string;
	iuc?: string;
	tv_provider?: string;
	btc_address?: string;
}

export interface Channels {
	title: string;
	icon: string;
	route: string;
	id?: string;
	added?: number;
	featured?: boolean;
	position?: number;
	app_version: number;
}

export interface HomePosts {
	id: string;
	title: string;
	posted: number;
	description: string;
	page: string;
	image: string;
	link: string;
}

export interface Bookmark {
	id: string;
	title: string;
	image: string;
	channel: string;
	link: string;
	saved: number;
}

export interface Rating {
	id: string;
	cid: string;
	rater: string;
	point: number;
	comment: string;
	rated: number;
	profile?: UserProfile;
}

export interface BillSettings {
	airtime_discount: number;
	giveaway_charges: number;
	giveaway_charges_cap: number;
	sms_discount: number;
	transfer_charges: number;
	transfer_charges_cap: number;
}

export interface GiveawayBeneficiary {
	id: number;
	uid: string;
	gid: string;
	accounts: string;
	engaged_link: boolean;

	paid: string;
	paid_timestamp: number;

	timestamp: number;
	applied: string;

	username: string;
	dp: string;

	selected: boolean;
	submittedAccount;
}

export interface FlutterDataBundles {
	id: number;
	biller_code: string;
	name: string;
	default_commission: number;
	date_added: string;
	country: string;
	is_airtime: string;
	biller_name: string;
	item_code: string;
	short_name: string;
	fee: number;
	commission_on_fee: string;
	label_name: string;
	amount: number;
}

export interface Notifications {
	title: string;
	body: string;
	channel: string;
	sent: number;
}

export interface ContactsPlugin {
	getPermissions(): Promise<PermissionStatus>;

	getContacts(): Promise<{ contacts: Contact[] }>;
}

export interface PermissionStatus {
	granted: boolean;
}

export interface Contact {
	contactId: string;
	username?: string;
	phoneNumbers: PhoneNumber[];
	emails: EmailAddress[];
	photoThumbnail?: string;
	organizationName?: string;
	organizationRole?: string;
	birthday?: string;
	dbContact?: DbContact;
}

export interface PhoneNumber {
	label?: string;
	number?: string;
}

export interface EmailAddress {
	label?: string;
	address?: string;
}

export interface DbContact {
	id: number;
	uid: string;
	name: string;
	username: string;
	phone_number: string;
	dp: string;
	account_number: string;
	added: string;
}

export interface PaiteeTasks {
	id: number;
	title: string;
	message: string;
	done: boolean;
	timestamp: number;
	ref: string;
	next?: boolean;
}

export interface PushData {
	sender: string;
	uid: string;
	topic: string;
	body: string;
	icon: string;
}

export interface AirtimeCash {
	transfer_code: string;
	network_name: string;
	status: string;
	phone_number: string;
	rate: string;
}

export interface Standings {
	username: string;
	dp: string;
	points: number;
	position: number;
	refers: number;
	uid: string;
}

export interface Channels {
	title: string;
	icon: string;
	route: string;
	id?: string;
	added?: number;
	featured?: boolean;
	hidden?: boolean;
	position?: number;
	description?: string;
}

export interface Gift {
	id: string;
	name: string;
	description: string;
	item_value: string;
	price: number;
	og_price: number;
	type: 'airtime' | 'mobile_data' | 'tv' | 'cash' | 't-shirt';
	provider: 'mtn' | 'glo' | '9mobile' | 'airtel' | 'paitee';
	ref: string;
	item_code: string;
	owner: string;
	deleted: boolean;
	created: number;
	updated: number;
}

export interface InvestorStats {
	users: number;
	active_user: number;
	today_users: number;
	today_pay_in: number;
	today_pay_out: number;
	total_pay_in: number;
	total_pay_out: number;
	myShare: number;
	investment: number;
	investors: number;
	sharePrice: number;
	applets: number;
	availableShares: number;
}

export interface Investors {
	id: number;
	name: string;
	share: number;
	paid: number;
	pass_code: string;
	dp: string;
	share_volume: number;
	created: string;
	updated: string;
}

export interface ApiInfo {
	billsBalance: number;
	airtime: boolean;
	data: boolean;
	cable: boolean;
	gifts: boolean;
	electricity: boolean;
	airtimeCash: boolean;
	transfer: boolean;
}
