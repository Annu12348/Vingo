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
    <div className="bg-white rounded-lg shadow-md p-5 w-[50%] mb-6 border border-orange-100">
      <h1 className="text-lg capitalize font-bold mb-3 text-[#ff4d2d] ">today deliveries</h1>


      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={ordertodayDeliveries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='hour' tickFormatter={(h) => `${h}:00`} />
            <YAxis dataKey='count' allowDecimals={false} />
            <Tooltip formatter={(value) => [value, 'others']} labelFormatter={(label) => `${label}:00`}/>
              <Bar dataKey='count' fill='#ff4d2d' />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Today&apos;s Earnings</span>
        <span className="text-lg font-bold text-green-600">
          ₹{totalEarning.toLocaleString()}
        </span>
     </div>
    </div>
  )
}

export default Recharts
