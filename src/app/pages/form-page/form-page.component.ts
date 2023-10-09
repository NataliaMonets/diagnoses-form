import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { MetadataService } from 'src/app/shared/_services/metadata.service';
import { Guid } from 'guid-typescript';
import { DiagnosisData } from 'src/app/shared/constants/metadata.constants';
import { DiagnosisDetails } from 'src/app/shared/interfaces/data.interfaces';
import { ConditionForm, DiagnosesForm } from 'src/app/shared/interfaces/form.interfaces';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from 'src/app/shared/inputs/date-input/date-input.component';
import { TextInputComponent } from 'src/app/shared/inputs/text-input/text-input.component';
import { SelectInputComponent } from 'src/app/shared/inputs/select-input/select-input.component';

@Component({
    standalone: true,
    selector: 'app-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DateInputComponent,
        SelectInputComponent,
        TextInputComponent,
        FormPageComponent
    ]
})
export class FormPageComponent implements OnInit {

    public form: FormGroup;
    public jsonData: string = '';
    public diagnosisData: DiagnosisDetails[] = DiagnosisData;
    public submitted: boolean = false;

    get f() { return this.form.controls; };

    get conditionsList(): FormArray {
        return this.f['conditions'] as FormArray;
    };

    constructor(
        private formBuilder: FormBuilder,
        private metadataService: MetadataService
    ) { }

    ngOnInit(): void {
        this.initForm();
        // this.getDiagnosisData();
    }

    public addCondition(): void {
        this.conditionsList.push(
            this.formBuilder.group<ConditionForm>({
                diagnosis: this.formBuilder.control(null, Validators.required),
                comment: this.formBuilder.control(null)
            })
        )
    }

    public deleteCondition(index: number): void {
        this.conditionsList.removeAt(index);
    }

    public createJSON(): void {
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }

        const formData = {
            "encounter": {
                "date": this.f['date'].value
            },
            "conditions": []
        }

        if (this.conditionsList.length > 0) {
            this.conditionsList.controls.forEach(element => {
                const diagnosis = this.diagnosisData.find(diagnosis => diagnosis.code === element.value['diagnosis']);
                formData.conditions.push(
                    {
                        "id": Guid.create().toString(),
                        "context": {
                            "identifier": {
                                "type": {
                                    "coding": [
                                        {
                                            "system": "eHealth/resources",
                                            "code": "encounter"
                                        }
                                    ]
                                },
                                "value": diagnosis.id
                            }
                        },
                        "code": {
                            "coding": [
                                {
                                    "system": "eHealth/ICPC2/condition_codes",
                                    "code": diagnosis.code
                                }
                            ]
                        },
                        "notes": element.value['comment'] ?? "",
                        "onset_date": new Date
                    }
                );
            });
        }

        this.jsonData = JSON.stringify(formData, null, 2);
        this.form.reset();
        this.conditionsList.clear();
        this.submitted = false;
    }

    private initForm(): void {
        this.form = this.formBuilder.group<DiagnosesForm>({
            date: this.formBuilder.control(null, Validators.required),
            conditions: this.formBuilder.array([])
        });
    }

    private getDiagnosisData(): void {
        this.metadataService.getDiagnosisData().pipe(first()).subscribe(data => {
            this.diagnosisData = data;
        })
    }

}
