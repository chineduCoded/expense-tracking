import React from 'react'
import { useGetLabelsQuery } from '../features/expenseApi'
import { getLabels } from '../helper/helper'

export const Labels = () => {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery()

  let Transactions

  if (isFetching) {
    Transactions = <div>Fetching data...</div>
  } else if (isSuccess) {
    Transactions = getLabels(data, 'type')?.map((v, i) => (
      <LabelComponent key={i} data={v} />
    ))
  } else if (isError) {
    Transactions = <div>Error getting data!</div>
  }

  return <>{Transactions}</>
}

function LabelComponent({ data }) {
  if (!data) return <></>
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? '#f9c74f' }}
        ></div>
        <h3 className="text-md">{data.type ?? ''}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  )
}
