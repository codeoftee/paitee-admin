import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users.component';


const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Users'
		},
		children: [
			{
				path: '',
				redirectTo: 'all'
			},
			{
				path: ':id',
				component: ProfileComponent,
				data: {
					title: 'User Profile'
				}
			},
			{
				path: 'view/all',
				component: UsersComponent,
				data: {
					title: 'All Users'
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule {}
