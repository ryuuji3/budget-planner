import { useForm } from "react-hook-form";
import styles from './IncomeForm.module.scss';
import { Income, PaymentFrequency } from "../models";

function IncomeForm({ values = {}, onSubmit }: IncomeFormProps) {
    const { 
        register, 
        handleSubmit 
    } = useForm<FieldValues>();

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className={styles.container}
        >
            <div className="input-group required">
                <label htmlFor="payee" className="label">🤨 Where is this money coming from?</label>
                <input 
                    {...register('payee', { 
                        required: true, 
                        value: values.payee, 
                    })} 
                    type="text"
                    placeholder="Payee"
                    className="input"
                />
            </div>
            
            <div className="input-group required">
                <label htmlFor="amount">💲 Amount</label>
                <input
                    {...register('amount', { 
                        required: true, 
                        value: values.amount,
                        valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="$0.00"
                />
            </div>

            <div className="input-group required">
                <label htmlFor="frequency">🔄 Frequency</label>
                <select
                    {...register('frequency', { 
                        required: true, 
                        value: values.frequency,
                    })}
                >
                    <option value="">Select frequency</option>
                    <option value={PaymentFrequency.Weekly}>Weekly</option>
                    <option value={PaymentFrequency.BiWeekly}>Bi-weekly</option>
                    <option value={PaymentFrequency.Monthly}>Monthly</option>
                </select>
            </div>

            <div className="input-group required">
                <label htmlFor="startDate">📅 Start Date</label>
                <input
                    {...register('startDate', { 
                        required: true, 
                        value: values.startDate,
                        valueAsDate: true,
                    })}
                    type="date"
                />
            </div>

            <div className="input-group optional">
                <label htmlFor="endDate">📅 End Date</label>
                <span className="help-text">
                    If provided, this means you are no longer receiving this income into your budget.
                </span>
                <input
                    {...register('endDate', { 
                        required: false, 
                        valueAsDate: true,
                    })}
                    type="date"
                />
            </div>

            <button type="submit" className="submit">Add Income</button>
        </form>
    );
}

interface IncomeFormProps {
    values: Partial<FieldValues>;
    onSubmit: (data: FieldValues) => void;
}

type FieldValues = Income;

export default IncomeForm;