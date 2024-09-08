import classNames from "classnames";

import { Income, PaymentFrequency } from "../models";
import styles from './IncomeDisplay.module.scss';

import { HTMLAttributes } from "react";

const TODAY = new Date();

function IncomeDisplay({ amount, payee, frequency, endDate }: IncomeDisplayProps) {
    const isActive = !endDate || endDate > TODAY;

    return (
        <div 
            className={classNames(styles.container, {
                [styles.active]: isActive,
            })}
        >
            <div className={styles.details}>
                <div className={styles.payee}>{payee}</div>
                <AmountDisplay 
                    amount={amount} 
                    frequency={frequency} 
                    className={styles.amount}
                />
            </div>
            
            <StatusText 
                isActive={isActive}
                className={styles.status}
            />
        </div>
    )
}

function formatCurrency(amount: number) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

function StatusText({ isActive, ...htmlProps }: { isActive: boolean } & HTMLAttributes<HTMLSpanElement>) {
    return (
        <div {...htmlProps}>
            {isActive 
                ? 'active'
                : 'inactive'
            }
        </div>
    );
}

function AmountDisplay({ amount, frequency, ...htmlProps }: { amount: number, frequency: PaymentFrequency } & HTMLAttributes<HTMLSpanElement>) {
    return (
        <span {...htmlProps}>
            {formatCurrency(amount)}/{getFrequencyAbbreviation(frequency)}
        </span>
    );
}

function getFrequencyAbbreviation(frequency: PaymentFrequency) {
    switch (frequency) {
        case PaymentFrequency.Weekly:
            return 'wk';
        case PaymentFrequency.BiWeekly:
            return 'bi-wk';
        case PaymentFrequency.Monthly:
            return 'mo';
        default: return frequency;
    }
}

export default IncomeDisplay;

type IncomeDisplayProps = Income;