import { useEffect, useRef, useState } from "react"
import { useFetcher } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset()
      // reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Enforce maximum length
    const maxLength = 10;
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    setNewExpenseAmount(inputValue);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New{" "}<span className="accent">
        {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
      </span>{" "}
        Expense
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Milk"
              maxLength="15"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="text"
              pattern="[0-9]*"
              value={newExpenseAmount}
              onChange={handleInputChange}
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., €200"
              required
              inputMode="decimal"
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {
              budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddExpenseForm