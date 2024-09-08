export interface Income {
    payee: string;
    amount: number;
    frequency: PaymentFrequency;
    startDate: Date;
    endDate?: Date;
}

export enum PaymentFrequency {
    Weekly = "weekly",
    BiWeekly = "bi-weekly",
    Monthly = "monthly",
}