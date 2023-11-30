import { trigger, state, style, animate, transition } from '@angular/animations';

// Animation definition for element visibility transition
export const Animation = trigger('Animation', [
  // Initial state when element is not present in the DOM
  state('void', style({
    opacity: 0
  })),
  // State when element is present in the DOM
  state('*', style({
    opacity: 1
  })),
  // Transition when element enters the DOM
  transition('void => *', [
    animate('1s ease-in') // Fade in over 1 second with ease-in effect
  ]),
  // Transition when element leaves the DOM
  transition('* => void', [
    animate('1s ease-out') // Fade out over 1 second with ease-out effect
  ])
]);
