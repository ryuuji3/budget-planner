import { Meta, StoryObj } from '@storybook/react';

import IncomeForm from "./IncomeForm"


const meta = {
    title: 'Components/IncomeForm',
    component: IncomeForm,
    argTypes: {
        onSubmit: { action: 'submit' }
    }
} satisfies Meta<typeof IncomeForm>;

export default meta;

type Story = StoryObj<typeof IncomeForm>;

export const Empty = {} satisfies Story;