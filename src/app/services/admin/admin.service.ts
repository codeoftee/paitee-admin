import {Injectable} from '@angular/core';
import {Stats} from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  stats = {} as Stats;

  constructor() {
  }
}
