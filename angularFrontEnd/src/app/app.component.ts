import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MEGALO';
  modeText: string = 'Activer le mode clair';
  isDarkMode: boolean = true;

  toggleDarkMode() {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
    this.isDarkMode = !this.isDarkMode;
    this.modeText = this.isDarkMode
      ? 'Activer le mode clair'
      : 'Passer en mode sombre';
  }
}
