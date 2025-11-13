import { Component } from '@angular/core';
import { Switcher } from "../../core/forms/switcher/switcher";
import { FormsModule } from '@angular/forms';
import { RatingStars } from "../../core/forms/rating-stars/rating-stars";

@Component({
  selector: 'app-switcher-test',
  imports: [Switcher, FormsModule, RatingStars],
  templateUrl: './switcher-test.html',
  styleUrl: './switcher-test.css',
})
export class SwitcherTest {
  active = true
  nbStars = 0
}
