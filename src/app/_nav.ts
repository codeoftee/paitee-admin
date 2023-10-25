import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
	{
		name: 'Dashboard',
		url: '/home',
		icon: 'icon-speedometer',
		badge: {
			variant: 'danger',
			text: 'NEW'
		}
	},
	{
		name: 'Users',
		url: '/users',
		icon: 'icon-people',
		children: [
			{
				name: 'All Users',
				url: '/users/view/all',
				icon: 'icon-people'
			}
		]
	},
	{
		name: 'Channels',
		url: '/channels',
		icon: 'icon-layers',

	},
	{
		name: 'Payments',
		url: '/payments',
		icon: 'icon-credit-card',
		children: [
			{
				name: 'Wallet Credits',
				url: '/payments/card',
				icon: 'icon-credit-card'
			},
			{
				name: 'Virtual Transfers',
				url: '/payments/virtual',
				icon: 'icon-ghost'
			},
			{
				name: 'Direct Transfers',
				url: '/payments/transfers',
				icon: 'icon-cursor'
			},
			{
				name: 'Failed Payments',
				url: '/payments/failed',
				icon: 'icon-close'
			},
		],
	},
	{
		name: 'Bills',
		url: '/bills',
		icon: 'icon-calculator',
		children: [
			{
				name: 'Airtime',
				url: '/bills/airtime',
				icon: 'icon-phone'
			},
			{
				name: 'Airtime Cash',
				url: '/bills/airtimeCash',
				icon: 'icon-call-out'
			},
			{
				name: 'Mobile Data',
				url: '/bills/mobile_data',
				icon: 'icon-globe'
			},
			{
				name: 'Cable Tv',
				url: '/bills/cable',
				icon: 'icon-screen-desktop'
			},
			{
				name: 'Electricity',
				url: '/bills/electricity',
				icon: 'icon-energy'
			},
			{
				name: 'Bank Transfer',
				url: '/bills/transfer',
				icon: 'icon-plane'
			},

		]
	},
	{
		name: 'Gifts',
		url: '/gifts',
		icon: 'icon-present',

	},
	{
		name: 'Investors',
		url: '/investors',
		icon: 'icon-people',

	},
	{
		name: 'Settings',
		url: '/settings',
		icon: 'icon-settings',

	},
	{
		title: true,
		name: 'Theme'
	},
	{
		name: 'Colors',
		url: '/theme/colors',
		icon: 'icon-drop'
	},
	{
		name: 'Typography',
		url: '/theme/typography',
		icon: 'icon-pencil'
	},
	{
		title: true,
		name: 'Components'
	},
	{
		name: 'Base',
		url: '/base',
		icon: 'icon-puzzle',
		children: [
			{
				name: 'Cards',
				url: '/base/cards',
				icon: 'icon-puzzle'
			},
			{
				name: 'Carousels',
				url: '/base/carousels',
				icon: 'icon-puzzle'
			},
			{
				name: 'Collapses',
				url: '/base/collapses',
				icon: 'icon-puzzle'
			},
			{
				name: 'Forms',
				url: '/base/forms',
				icon: 'icon-puzzle'
			},
			{
				name: 'Navbars',
				url: '/base/navbars',
				icon: 'icon-puzzle'

			},
			{
				name: 'Pagination',
				url: '/base/paginations',
				icon: 'icon-puzzle'
			},
			{
				name: 'Popovers',
				url: '/base/popovers',
				icon: 'icon-puzzle'
			},
			{
				name: 'Progress',
				url: '/base/progress',
				icon: 'icon-puzzle'
			},
			{
				name: 'Switches',
				url: '/base/switches',
				icon: 'icon-puzzle'
			},
			{
				name: 'Tables',
				url: '/base/tables',
				icon: 'icon-puzzle'
			},
			{
				name: 'Tabs',
				url: '/base/tabs',
				icon: 'icon-puzzle'
			},
			{
				name: 'Tooltips',
				url: '/base/tooltips',
				icon: 'icon-puzzle'
			}
		]
	},
	{
		name: 'Buttons',
		url: '/buttons',
		icon: 'icon-cursor',
		children: [
			{
				name: 'Buttons',
				url: '/buttons/buttons',
				icon: 'icon-cursor'
			},
			{
				name: 'Dropdowns',
				url: '/buttons/dropdowns',
				icon: 'icon-cursor'
			},
			{
				name: 'Brand Buttons',
				url: '/buttons/brand-buttons',
				icon: 'icon-cursor'
			}
		]
	},
	{
		name: 'Charts',
		url: '/charts',
		icon: 'icon-pie-chart'
	},
	{
		name: 'Icons',
		url: '/icons',
		icon: 'icon-star',
		children: [
			{
				name: 'CoreUI Icons',
				url: '/icons/coreui-icons',
				icon: 'icon-star',
				badge: {
					variant: 'success',
					text: 'NEW'
				}
			},
			{
				name: 'Flags',
				url: '/icons/flags',
				icon: 'icon-star'
			},
			{
				name: 'Font Awesome',
				url: '/icons/font-awesome',
				icon: 'icon-star',
				badge: {
					variant: 'secondary',
					text: '4.7'
				}
			},
			{
				name: 'Simple Line Icons',
				url: '/icons/simple-line-icons',
				icon: 'icon-star'
			}
		]
	},
	{
		name: 'Notifications',
		url: '/notifications',
		icon: 'icon-bell',
		children: [
			{
				name: 'Alerts',
				url: '/notifications/alerts',
				icon: 'icon-bell'
			},
			{
				name: 'Badges',
				url: '/notifications/badges',
				icon: 'icon-bell'
			},
			{
				name: 'Modals',
				url: '/notifications/modals',
				icon: 'icon-bell'
			}
		]
	},
	{
		name: 'Widgets',
		url: '/widgets',
		icon: 'icon-calculator',
		badge: {
			variant: 'info',
			text: 'NEW'
		}
	},
	{
		divider: true
	},
	{
		title: true,
		name: 'Extras',
	},
	{
		name: 'Pages',
		url: '/pages',
		icon: 'icon-star',
		children: [
			{
				name: 'Login',
				url: '/login',
				icon: 'icon-star'
			},
			{
				name: 'Register',
				url: '/register',
				icon: 'icon-star'
			},
			{
				name: 'Error 404',
				url: '/404',
				icon: 'icon-star'
			},
			{
				name: 'Error 500',
				url: '/500',
				icon: 'icon-star'
			}
		]
	},
	{
		name: 'Disabled',
		url: '/dashboard',
		icon: 'icon-ban',
		badge: {
			variant: 'secondary',
			text: 'NEW'
		},
		attributes: {disabled: true},
	},
	{
		name: 'Download CoreUI',
		url: 'http://coreui.io/angular/',
		icon: 'icon-cloud-download',
		class: 'mt-auto',
		variant: 'success',
		attributes: {target: '_blank', rel: 'noopener'}
	},
	{
		name: 'Try CoreUI PRO',
		url: 'http://coreui.io/pro/angular/',
		icon: 'icon-layers',
		variant: 'danger',
		attributes: {target: '_blank', rel: 'noopener'}
	}
];
