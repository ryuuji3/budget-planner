import { Meta, StoryObj } from "@storybook/react";
import IncomeDisplay from "./IncomeDisplay";
import { PaymentFrequency } from "../models";

const meta = {
    title: "Components/IncomeDisplay",
    component: IncomeDisplay,
} satisfies Meta<typeof IncomeDisplay>;

export default meta;

type Story = StoryObj<typeof IncomeDisplay>;

export const Active = {
    args: {
        payee: "Ratehub Inc.",
        amount: 5000,
        frequency: PaymentFrequency.Monthly,
        startDate: new Date("2021-01-01"),
    }
} satisfies Story;

export const Inactive = {
    args: {
        payee: "Ratehub Inc.",
        amount: 2500,
        frequency: PaymentFrequency.BiWeekly,
        startDate: new Date("2021-01-01"),
        endDate: new Date("2021-12-31"),
    }
} satisfies Story;
