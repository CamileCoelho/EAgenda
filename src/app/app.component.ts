import { animate, transition, style, state, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({ transform: 'translateX(0)' })),
  //     transition('void => *', [
  //       animate(300, style({ transform: 'translateX(-100%)' }))
  //     ]),
  //     transition('* => void', [
  //       animate(300, style({ transform: 'translateX(100%)' }))
  //     ])
  //   ])
  // ]
})
export class AppComponent {
  title = 'EAgenda';
}
