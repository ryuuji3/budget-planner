export interface Income {
    payee: string;
    amount: number;
    frequency: PaymentFrequency;
    startDate: Date;
    endDate?: Date;
}

export interface Payee {
    name: string;

    payments: Income[];
}

export enum PaymentFrequency {
    Weekly = "weekly",
    BiWeekly = "bi-weekly",
    Monthly = "monthly",
}