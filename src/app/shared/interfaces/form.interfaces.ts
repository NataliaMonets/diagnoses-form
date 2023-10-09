import { FormArray, FormControl } from "@angular/forms";

export interface DiagnosesForm {
    date: FormControl<string>;
    conditions: FormArray;
}

export interface ConditionForm {
    diagnosis: FormControl<string>;
    comment: FormControl<string>;
}