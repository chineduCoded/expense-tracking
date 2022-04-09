import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Labels } from './Labels'
import { chartData, getTotal } from '../helper/helper'
import { useGetLabelsQuery } from '../features/expenseApi'
import { NairaSymbol } from './NairaSymbol'

Chart.register(ArcElement)

export const Graph = () => {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery()

  let graphData

  if (isFetching) {
    graphData = <div>Fetching data...</div>
  } else if (isSuccess) {
    graphData = <Doughnut {...chartData(data)} />
  } else if (isError) {
    graphData = <div>Error getting data!</div>
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              <NairaSymbol />
              {getTotal(data) ?? 0}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          <Labels />
        </div>
      </div>
    </div>
  )
}
