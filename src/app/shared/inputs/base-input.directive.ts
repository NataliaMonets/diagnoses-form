import { Directive, Input } from '@angular/core';

@Directive({})
export abstract class BaseInputDirective {

    @Input() public label: string;
    @Input() public controlName: string;
    @Input() public controlNamePrefix: string;
    @Input() public form: any;
    @Input() public submitted: boolean = false;

    public get f() {
        return this.form.get(this.controlName);
    }

    public get fieldId(): string {
        return `${this.controlNamePrefix}_${this.controlName}`;
    }

    public getErrorMessage(key: string | any, error): string {
        let message = null;
        switch (key) {
            case 'required':
                message = '*Це поле є обов\'язковим';
                break;
            case 'email':
                message = '*Введіть дійсну адресу електронної пошти';
                break;
            case 'maxlength':
                message = `*Введіть максимум ${error.value.requiredLength} символів`;
                break;
            case 'minlength':
                message = `*Введіть мінімум ${error.value.requiredLength} символів`;
                break;
        }
        return message;
    }

}
