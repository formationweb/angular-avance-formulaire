import { Component } from '@angular/core';
import { Switcher } from "../../core/forms/switcher/switcher";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switcher-test',
  imports: [Switcher, FormsModule],
  templateUrl: './switcher-test.html',
  styleUrl: './switcher-test.css',
})
export class SwitcherTest {
  active = true
}
