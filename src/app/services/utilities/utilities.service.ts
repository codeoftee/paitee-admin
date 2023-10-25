import {Injectable} from '@angular/core';

export interface SelectedImage {
	filename: string;
	filePath: string;
	webView: string;
}

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {
	loading: Boolean = false;

	constructor() {
	}

	isValidURL(string) {
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}

	validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	validatePhone(phone) {
		return phone.match(/\d/g).length === 11;
	}

	randomNumber(length, withZero = true) {
		let result = '203';
		let characters = '0123456789';
		if (!withZero) {
			characters = '123456789';
		}
		const charactersLength = characters.length;
		if (isNaN(length)) {
			length = 10;
		}

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result.substring(0, length);
	}

	randomString(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charactersLength = characters.length;
		if (isNaN(length)) {
			length = 10;
		}
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result.substring(0, length);
	}

	dynamicSort(property) {
		let sortOrder = 1;
		if (property[0] === '-') {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			/* next line works with strings and numbers,
			 * and you may want to customize it to your needs
			 */
			const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		};
	}

	dynamicSortMultiple() {
		/*
		 * save the arguments object as it will be overwritten
		 * note that arguments object is an array-like object
		 * consisting of the names of the properties to sort by
		 */
		const self = this;
		const props = arguments;
		return function (obj1, obj2) {
			let i = 0, result = 0;
			const numberOfProperties = props.length;
			/* try getting a different result from 0 (equal)
			 * as long as we have extra properties to compare
			 */
			while (result === 0 && i < numberOfProperties) {
				result = self.dynamicSort(props[i])(obj1, obj2);
				i++;
			}
			return result;
		};
	}

	cleanPhone(phone_number): string {
		// remove - and spaces
		let ng_number = phone_number.toString().replace(/\D/g, '');
		// If string starts with +, drop first 3 characters
		if (ng_number.slice(0, 1) === '+') {
			ng_number = ng_number.substring(4);
			// add leading zero
			ng_number = '0' + ng_number;
		} else if (ng_number.length === 13) {
			ng_number = ng_number.substring(3);
			// add leading zero
			ng_number = '0' + ng_number;
		}
		console.log('cleaned number ', ng_number);
		return ng_number;
	}
}
