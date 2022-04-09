import React from 'react'
import { useForm } from 'react-hook-form'
import { useAddTransactionMutation } from '../features/expenseApi'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { List } from './List'

const schema = yup.object({
  name: yup.string().required(),
  gender: yup.string(),
  amount: yup.number().required().positive(),
})

export const Form = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
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
              {...register('name', { required: true })}
              placeholder="Salary, House rent, etc"
              className="form-input"
            />
            <p style={{ color: 'red' }}>{errors.name?.message}</p>
          </div>
          <select
            className="form-input"
            {...register('type', { required: true })}
          >
            <option value="Investment" defaultValue="Investment">
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              {...register('amount', { required: true })}
              placeholder="Amount"
              className="form-input"
            />
            <p style={{ color: 'red' }}>{errors.amount?.message}</p>
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
