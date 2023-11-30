import { trigger, state, style, animate, transition } from '@angular/animations';

export const Animation = trigger('Animation', [
  state('void', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition('void => *', [
    animate('1s ease-in')
  ]),
  transition('* => void', [
    animate('1s ease-out')
  ])
]);
