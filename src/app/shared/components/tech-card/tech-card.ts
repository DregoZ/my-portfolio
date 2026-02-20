import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-card.html',
  styleUrl: './tech-card.css',
})
export class TechCard {
  @Input({ required: true }) tech: any;
}
