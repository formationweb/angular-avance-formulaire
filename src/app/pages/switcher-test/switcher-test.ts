import { Component } from '@angular/core';
import { Switcher } from "../../core/forms/switcher/switcher";
import { FormsModule } from '@angular/forms';
import { RatingStars } from "../../core/forms/rating-stars/rating-stars";
import { TokenMultiSelect } from "../../core/forms/token-multi-select/token-multi-select";

@Component({
  selector: 'app-switcher-test',
  imports: [Switcher, FormsModule, RatingStars, TokenMultiSelect],
  templateUrl: './switcher-test.html',
  styleUrl: './switcher-test.css',
})
export class SwitcherTest {
  active = true
  nbStars = 0

  members = [
    {
      id: 1,
      label: 'Alice'
    },
    {
      id: 2,
      label: 'Ben'
    },
    {
      id: 3,
      label: 'Jim'
    }
  ]

  membersSelected = []
}
