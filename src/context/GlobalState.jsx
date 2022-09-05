import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  transactions: [],
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function deleteTransactions(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  //Actions
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function updateTransaction(id, newTransaction) {
    dispatch({
      type: "UPDATE_TRANSACTION",
      payload: { id, newTransaction },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransactions,
        addTransaction,
        updateTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id
            ? action.payload.newTransaction
            : transaction
        ),
      };
    default:
      return state;
  }
};

export default GlobalProvider;
