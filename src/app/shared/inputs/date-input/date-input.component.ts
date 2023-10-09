import { Component, OnInit } from '@angular/core';
import { BaseInputDirective } from '../base-input.directive';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseInputDirective implements OnInit {

    constructor() {
        super();
    }


    ngOnInit(): void {
    }

}
