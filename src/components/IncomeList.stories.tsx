import { Meta, StoryObj } from "@storybook/react";
import { PaymentFrequency } from "../models";
import IncomeList from "./IncomeList";


const meta = {
    title: 'Components/IncomeList',
    component: IncomeList,
} satisfies Meta<typeof IncomeList>;

export default meta;

type Story = StoryObj<typeof IncomeList>;

export const Empty = {

} satisfies Story;

export const MultiplePayees = {
    args: {
        payees: [
            {
                name: "Ratehub Inc.",
                payments: [
                    { payee: "Ratehub Inc.", amount: 7000, frequency: PaymentFrequency.Monthly, startDate: new Date("2022-01-01") },
                    { payee: "Ratehub Inc.", amount: 3000, frequency: PaymentFrequency.BiWeekly, startDate: new Date("2021-01-01"), endDate: new Date("2021-12-31") },
                ]
            },
            {
                name: "Shopify",
                payments: [
                    { payee: "Shopify", amount: 1500, frequency: PaymentFrequency.Weekly, startDate: new Date("2019-01-01"), endDate: new Date("2020-12-31") },
                    { payee: "Shopify", amount: 2000, frequency: PaymentFrequency.BiWeekly, startDate: new Date("2017-01-01"), endDate: new Date("2019-01-01") },
                ]
            }
        ]
    }
} satisfies Story;