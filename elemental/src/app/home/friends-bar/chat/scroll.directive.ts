// import {Directive} from "@angular/core";
//
// @Directive({
//   selector: '[track-scroll]',
//   host: {'(window:scroll)': 'track($event)'}
// })
//
// export class TrackScrollDirective {
//   track($event: Event) {
//     console.debug("Scroll Event", $event);
//   }
// }
// import { Directive, ElementRef, HostListener } from '@angular/core';
//
// @Directive({
//   selector: '[track-scroll]'
// })
// export class TrackScrollDirective {
//   constructor(private el: ElementRef) {}
//
//   @HostListener('scroll', ['$event'])
//   track($event: Event) {
//     console.debug('Scroll Event', $event);
//   }
// }

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[track-scroll]'
})
export class TrackScrollDirective {
  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  track($event: Event) {
    const target = $event.target as HTMLElement;
  }
}
