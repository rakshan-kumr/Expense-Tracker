import { useContext, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { useEffect } from 'react';
import { FetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await FetchExpenses();
      expensesCtx.setExpense(expenses);
      setIsFetching(false);
      // console.log(response);
    };
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses registered for the last 7 days.'
    />
  );
}

export default RecentExpenses;
