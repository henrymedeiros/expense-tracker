import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";
import { useContext } from "react";
const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
          ></Transaction>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
