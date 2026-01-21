import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { InsuranceService } from '../services/insurance';
import { InsurancePolicy } from '../models/insurance.models';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-read-insurace',
  imports: [RouterLink, CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './read-insurace.html',
  styleUrl: './read-insurace.css',
})
export class ReadInsurace {
  private insuranceService = inject(InsuranceService);
  private cdr = inject(ChangeDetectorRef);
  policies: InsurancePolicy[] = [];
  totalPolicies = 0;
  totalValue = 0;

  ngOnInit() {
    this.insuranceService.getPolicies().subscribe({
      next: (data) => {
        console.log('Data fetched from API:', data);
        this.policies = data;

        // Calculate Stats
        this.totalPolicies = data.length;
        this.totalValue = data.reduce((sum, p) => sum + (+p.premiumAmount || 0), 0);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
      },
    });
  }

  deletePolicy(id: string) {
    this.insuranceService.deletePolicy(id).subscribe({
      next: () => {
        this.policies = this.policies.filter(p => p.id !== id);
      },
      error: (err) => console.error(err),
    });
  }
}
