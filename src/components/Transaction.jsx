import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ transaction }) => {
  const { deleteTransactions } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <>
      <li className={sign === "-" ? "minus" : "plus"}>
        {transaction.text}{" "}
        <span>
          {sign} ${Math.abs(transaction.amount)}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteTransactions(transaction.id)}
        >
          x
        </button>
      </li>
    </>
  );
};

export default Transaction;
