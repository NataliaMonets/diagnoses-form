import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosisDetails } from '../interfaces/data.interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {

    private baseUrl = 'https://global.lakmus.org/Dictionaries/icpc2';
    private readonly http: HttpClient = inject(HttpClient);

    public getDiagnosisData(isPublic: boolean = true, search: string = 'Ост'): Observable<DiagnosisDetails[]> {
        return this.http.get<DiagnosisDetails[]>(`${this.baseUrl}?IsPublic=${isPublic}&Search=${search}`);
    }
    
}
