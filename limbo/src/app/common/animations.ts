import { trigger,state, style, transition, animate } from '@angular/animations';

export const textAppear =
	trigger('textAppear', [
		state('in', style({ opacity: 1, transform: 'translateY(0)' })),
		transition(':enter', [
			style({ transform: 'translateY(-40%)', opacity: '0'}),
			animate('600ms cubic-bezier(0.165, 0.84, 0.44, 1)')
		])
	])
