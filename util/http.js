import axios from 'axios';

const BASE_URL = 'https://expense-tracker-31dbe-default-rtdb.firebaseio.com/';
const EXPENSES_URL = `${BASE_URL}expenses.json`;

export const StoreExpense = async (expense) => {
  const response = await axios.post(EXPENSES_URL, expense);
  return response.data.name;
};

export const FetchExpenses = async () => {
  //   console.log('Fetching expenses... axios');
  const response = await axios.get(EXPENSES_URL);
  // console.log('Await response', response.data);
  const expenseObj = [];
  for (key in response.data) {
    const helperExpense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenseObj.push(helperExpense);
  }
  return expenseObj;
};

export const UpdateExpense = (id, expense) => {
  const response = axios.put(`${BASE_URL}/expenses/${id}.json`, expense);
  // return response.data;
};

export const DeleteExpense = (id) => {
  const response = axios.delete(`${BASE_URL}/expenses/${id}.json`);
  // return response.data;
};
