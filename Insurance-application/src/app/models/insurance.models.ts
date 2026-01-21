export interface InsurancePolicy {
    id: string;
    policyNumber: string;
    policyHolderName: string;
    type: 'Health' | 'Life' | 'Auto' | 'Home' | 'Car' | 'Business';
    premiumAmount: number;
    startDate: Date;
    endDate: Date;
    dateOfBirth: Date;
    email: string;
}

