import { Component, Input } from '@angular/core';
import { BaseInputDirective } from '../base-input.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SelectInputComponent extends BaseInputDirective {

    @Input() public defaultValue: string = 'Оберіть діагноз';
    @Input() public options: any[];

}
