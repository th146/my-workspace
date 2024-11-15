import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'workshop-root',
  template: `
    <div class="container flex justify-center items-center h-screen bg-teal-100 dark:bg-slate-800 dark:text-white">
      <router-outlet></router-outlet> <!-- Der Platzhalter für die Komponenten -->
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'workshop-ui';
}
