import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";

const Transaction = ({ transaction }) => {
  const { deleteTransactions, updateTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  const [editMode, setEditMode] = useState(false);

  const [transactionText, setTransactionText] = useState(transaction.text);
  const [transactionAmount, setTransactionAmount] = useState(
    transaction.amount
  );

  return (
    <>
      <li className={sign === "-" ? "minus" : "plus"}>
        {editMode ? (
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                updateTransaction(transaction.id, {
                  id: transaction.id,
                  text: transactionText,
                  amount: +transactionAmount,
                });
                setEditMode(false);
              }
            }}
          >
            <input
              autoFocus
              type="text"
              value={transactionText}
              onChange={(e) => setTransactionText(e.target.value)}
            />
            <input
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
          </div>
        ) : (
          <div onClick={() => setEditMode(true)}>
            <span>{transactionText}</span>
            <span>
              {sign} ${Math.abs(transactionAmount)}{" "}
            </span>
          </div>
        )}

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
