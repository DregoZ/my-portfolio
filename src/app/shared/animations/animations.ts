import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const staggerFadeIn = trigger('staggerFadeIn', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('100ms', [
          animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ],
      { optional: true },
    ),
  ]),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
