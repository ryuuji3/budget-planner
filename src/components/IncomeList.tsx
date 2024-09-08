import classNames from 'classnames';
import { useReducer } from 'react';
import { Income, Payee } from '../models';
import IncomeDisplay from './IncomeDisplay';
import IncomeForm from './IncomeForm';
import styles from './IncomeList.module.scss';
import { useModal } from './ModalProvider';


function IncomeList({ payees = [] }: IncomeListProps) {
    const modal = useModal();
    const [ currentPayees, dispatch ] = useReducer(payeesReducer, payees);
    const sortedPayees = currentPayees.sort(sortPayees);

    return (
        <div className={styles.container}>
            {sortedPayees.map(payee => (
                <div key={payee.name} className={styles.item}>
                    <IncomeDisplay
                        {...payee.payments.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0]}
                    />
                </div>
            ))}

            <button 
                className={classNames(styles.item, styles.add)}
                onClick={() => modal.open(
                    <IncomeForm
                        onSubmit={(values) => {
                            dispatch({ type: 'add', name: values.payee, income: values });
                            modal.close();
                        }}
                    />
                )}
            >
                <span>➕Add Income</span>
            </button>
        </div>
    );
}

function sortPayees(a: Payee, b: Payee) {
    const hasCurrentPaymentsA = a.payments.find(payment => !payment.endDate || payment.endDate >= new Date());
    const hasCurrentPaymentsB = b.payments.find(payment => !payment.endDate || payment.endDate >= new Date());

    // sort by whichever has most recent payments
    if (hasCurrentPaymentsA && !hasCurrentPaymentsB) {
        return -1;
    } else if (!hasCurrentPaymentsA && hasCurrentPaymentsB) {
        return 1;
    } else {
        return 0;
    }
}

function payeesReducer(state: Payee[], action: PayeeAction): Payee[] {
    switch (action.type) {
        case 'add': {
            const existingPayee = state.find(payee => payee.name === action.income.payee);

            if (existingPayee) {
                return state.map(payee => {
                    if (payee.name === action.income.payee) {
                        return {
                            ...payee,
                            payments: [
                                ...payee.payments,
                                action.income,
                            ]
                        };
                    }

                    return payee;
                });
            } else {
                return [
                    ...state,
                    {
                        name: action.income.payee,
                        payments: [action.income],
                    }
                ];
            }
        }
        case 'remove':
            return state.filter(payee => payee.name !== action.name);
        default:
            return state;
    }
}

interface PayeeAction {
    type: 'add' | 'remove';
    name: string;
    income: Income;
}

interface IncomeListProps {
    payees: Payee[];
}

export default IncomeList;