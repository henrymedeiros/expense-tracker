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

  const onEdit = () => {
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: "edit",
      amount: 123,
    };

    updateTransaction(transaction.id, newTransaction);
  };

  return (
    <>
      <li className={sign === "-" ? "minus" : "plus"}>
        <span
          onDoubleClick={() => {
            if (editMode) {
              const updatedTransaction = {
                id: transaction.id,
                text: transactionText,
                amount: transaction.amount,
              };

              updateTransaction(transaction.id, updatedTransaction);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
        >
          {editMode ? (
            <input
              type="text"
              value={transactionText}
              onChange={(e) => setTransactionText(e.target.value)}
              placeholder="edit mode"
            />
          ) : (
            transactionText
          )}
        </span>
        <span
          onDoubleClick={() => {
            if (editMode) {
              const updatedTransaction = {
                id: transaction.id,
                text: transaction.text,
                amount: +transactionAmount,
              };

              updateTransaction(transaction.id, updatedTransaction);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
        >
          {editMode ? (
            <input
              type="text"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              placeholder="edit mode"
            />
          ) : (
            <div>
              <RiEdit2Fill
                onClick={() => {
                  if (editMode) {
                    setEditMode(false);
                  } else {
                    setEditMode(true);
                  }
                }}
              ></RiEdit2Fill>
              <RiDeleteBin6Fill></RiDeleteBin6Fill>

              <span>
                {sign} ${Math.abs(transaction.amount)}{" "}
              </span>
            </div>
          )}
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
