import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';
  
  
  // Routable animations
  export const fader = 
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'scale(0) translateX(100%)'
                })
            ]),
            query(':enter', [
                animate('100ms ease', 
                    style({ opacity: 1, transform: 'scale(1) translateX(0)' })
                )
            ])
        ])
    ])
  ;

  export const slider = 
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left') ),
        transition('* => isRight', slideTo('right') ),
        transition('isRight => *', slideTo('left') )
    ]);

    function slideTo(direction) {
        const optional = { optional: true }
        return [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    [direction]: 0,
                    width: '100%'
                })
            ], optional),
            query(':enter', [
                style({[direction]: '-100%'})
            ]),
            group([
                query(':leave', [
                    animate('150ms ease', style({ [direction]: '100%' }))
                ], optional),
                query(':enter', [
                    animate('150ms ease', style({ [direction]: '0%' }))
                ])
            ])
        ]
    }