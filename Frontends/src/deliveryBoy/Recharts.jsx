import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Recharts = () => {
  const { ordertodayDeliveries } = useSelector(store => store.Order);

  
  
    const ratePerDelivery = 50
    const totalEarning = ordertodayDeliveries.reduce((sum, d) => sum + d.count*ratePerDelivery, 0)
 
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 border border-orange-100 flex flex-col">
      <h1 className="text-lg md:text-xl capitalize font-bold mb-3 text-[#ff4d2d]">
        today deliveries
      </h1>

      <div className="flex-1 min-h-[175px]">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={ordertodayDeliveries}
            margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour"
              tickFormatter={h => `${h}:00`}
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis
              dataKey="count"
              allowDecimals={false}
              fontSize={12}
            />
            <Tooltip
              formatter={value => [value, 'Deliveries']}
              labelFormatter={label => `${label}:00`}
            />
            <Bar dataKey="count" fill="#ff4d2d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-sm text-gray-600 font-medium">
          Today&apos;s Earnings
        </span>
        <span className="text-lg sm:text-xl font-bold text-green-600">
          ₹{totalEarning.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default Recharts
