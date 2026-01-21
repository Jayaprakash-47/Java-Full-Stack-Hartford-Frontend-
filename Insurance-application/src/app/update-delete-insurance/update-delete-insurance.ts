import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService } from '../services/insurance';

@Component({
  selector: 'app-update-delete-insurance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-delete-insurance.html',
  styleUrl: './update-delete-insurance.css',
})
export class UpdateDeleteInsurance implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private insuranceService = inject(InsuranceService);

  policyId: string | null = null;

  policyForm = new FormGroup({
    policyNumber: new FormControl('', Validators.required),
    policyHolderName: new FormControl('', Validators.required),
    type: new FormControl('Health', Validators.required),
    premiumAmount: new FormControl(0, Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.policyId = this.route.snapshot.paramMap.get('id');

    if (this.policyId) {
      this.insuranceService.getPolicy(this.policyId).subscribe({
        next: (policy) => {
          this.policyForm.patchValue({
            policyNumber: policy.policyNumber,
            policyHolderName: policy.policyHolderName,
            type: policy.type,
            premiumAmount: policy.premiumAmount,
            // Format dates for input[type="date"]
            startDate: new Date(policy.startDate).toISOString().split('T')[0],
            endDate: new Date(policy.endDate).toISOString().split('T')[0]
          });
        },
        error: (err) => {
          console.error('Error fetching policy', err);
          this.router.navigate(['/']);
        }
      });
    }
  }

  onUpdate() {
    if (this.policyForm.valid && this.policyId) {
      const updatedPolicy = {
        id: this.policyId,
        ...this.policyForm.value
      } as any;

      this.insuranceService.updatePolicy(updatedPolicy).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error updating policy', err)
      });
    }
  }

  onDelete() {
    if (this.policyId && confirm('Are you sure you want to delete this policy?')) {
      this.insuranceService.deletePolicy(this.policyId).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error deleting policy', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
