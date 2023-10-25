import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DbService} from '../../../services/fire-db/db.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
	selector: 'app-switch',
	templateUrl: './switch.component.html',
	styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
	@Input() title: string;
	@Input() switched: boolean;
	@Output() update = new EventEmitter<boolean>();
	debouncer = new Subject<boolean>();
	constructor(private db: DbService) {
		this.debouncer.pipe(debounceTime(2000)).subscribe((val) => {
			this.update.emit(val);
		});
	}

	ngOnInit(): void {
	}

	changeValue(val) {
		console.log('emitting ', val.target.checked);
		// this.update.emit(val.target.checked);
		this.debouncer.next(val.target.checked);
	}

}
