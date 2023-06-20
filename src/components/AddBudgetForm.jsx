import { useEffect, useRef, useState } from "react";
import { Form, useFetcher } from "react-router-dom"
import { CurrencyEuroIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  const [newBudgetAmount, setNewBudgetAmount] = useState('');

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Enforce maximum length
    const maxLength = 10;
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    setNewBudgetAmount(inputValue);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create budget
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
            maxLength="15"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="text"
            pattern="[0-9]*"
            value={newBudgetAmount}
            onChange={handleInputChange}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., €200"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create budget</span>
                <CurrencyEuroIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddBudgetForm