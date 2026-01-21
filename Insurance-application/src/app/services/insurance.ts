import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsurancePolicy } from '../models/insurance.models';

@Injectable({
    providedIn: 'root'
})
export class InsuranceService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/insurances';

    // Get all policies
    getPolicies(): Observable<InsurancePolicy[]> {
        return this.http.get<InsurancePolicy[]>(this.apiUrl);
    }

    // Get a single policy by ID
    getPolicy(id: string): Observable<InsurancePolicy> {
        return this.http.get<InsurancePolicy>(`${this.apiUrl}/${id}`);
    }

    // Create a new policy
    createPolicy(policy: Omit<InsurancePolicy, 'id'>): Observable<InsurancePolicy> {
        return this.http.post<InsurancePolicy>(this.apiUrl, policy);
    }

    // Update an existing policy
    updatePolicy(policy: InsurancePolicy): Observable<InsurancePolicy> {
        return this.http.put<InsurancePolicy>(`${this.apiUrl}/${policy.id}`, policy);
    }

    // Delete a policy
    deletePolicy(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
