import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosisDetails } from '../interfaces/data.interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {

    private readonly http: HttpClient = inject(HttpClient);

    public getDiagnosisData(): Observable<DiagnosisDetails[]> {
        return this.http.get<DiagnosisDetails[]>('https://global.lakmus.org/Dictionaries/icpc2?IsPublic=true&Search=Ост');
    }
}
