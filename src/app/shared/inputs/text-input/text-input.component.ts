import { Component, Input } from '@angular/core';
import { BaseInputDirective } from '../base-input.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class TextInputComponent extends BaseInputDirective {

    @Input() public type: string = 'text';
    @Input() public placeholder: string = 'коментар';

}
