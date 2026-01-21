import { Component, inject } from '@angular/core';
import { InsuranceService } from '../services/insurance';
import { ToastService } from '../services/toast';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-insurance',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-insurance.html',
  styleUrl: './create-insurance.css',
})
export class CreateInsurance {
  private insuranceService = inject(InsuranceService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  policyForm = new FormGroup({
    policyHolderName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('Health', Validators.required),
    premiumAmount: new FormControl(0, Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
  });

  onSubmit() {
    if (this.policyForm.valid) {
      const formValue = this.policyForm.value;
      const dob = new Date(formValue.dateOfBirth as any);

      // Generation Logic: HFT + YYMMDD (6 digits)
      const yearShort = dob.getFullYear().toString().slice(-2);
      const month = ('0' + (dob.getMonth() + 1)).slice(-2);
      const day = ('0' + dob.getDate()).slice(-2);

      const autoPolicyNumber = `HFT-${yearShort}${month}${day}`;

      const newPolicy = {
        ...formValue,
        policyNumber: autoPolicyNumber
      };

      this.insuranceService.createPolicy(newPolicy as any).subscribe({
        next: () => {
          // Simulate Email Trigger
          const email = formValue.email;
          this.toastService.show(`Success! Confirmation email sent to ${email}`, 'success');

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => console.error(err),
      });
    }
  }

  onReset() {
    this.policyForm.reset({
      type: 'Health',
      premiumAmount: 0,
      startDate: new Date(),
      endDate: new Date()
    } as any);
  }
}
