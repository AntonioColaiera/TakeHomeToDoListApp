import { animate, style, transition, trigger } from '@angular/animations';

export const appearDisappearAnimation = trigger('appearDisappear', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('500ms ease-in-out', style({ opacity: 0 }))
  ])
]);
