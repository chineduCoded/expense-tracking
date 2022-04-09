import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddTransactionMutation } from '../features/expenseApi'
import { List } from './List'

export const Form = () => {
  const { register, handleSubmit, resetField } = useForm()
  const [addTransaction] = useAddTransactionMutation()

  const onSubmit = async (data) => {
    if (!data) return {}
    await addTransaction(data).unwrap()
    resetField('name')
    resetField('amount')
  }
  return (
    <div className="form max-w-sm mx-auto w-96">
      <div className="font-bold pb-4 text-xl">Transaction</div>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register('name')}
              placeholder="Salary, House rent, etc"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register('type')}>
            <option value="Investment" defaultValue="Investment">
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              {...register('amount')}
              placeholder="Amout"
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button
              type="submit"
              className="border py-2 text-white bg-indigo-500 w-full rounded"
            >
              Make Transaction
            </button>
          </div>
        </div>
      </form>

      <List />
    </div>
  )
}
