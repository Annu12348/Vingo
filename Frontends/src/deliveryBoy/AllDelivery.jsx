import React from 'react'
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

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
}

const AllDelivery = () => {
    const { orderAllDeliveries } = useSelector(store => store.Order);

    const ratePerDeliveries = 42;
    const totalEarning = orderAllDeliveries.reduce((sum, d) => sum + d.count * ratePerDeliveries, 0);

    const chartData = orderAllDeliveries.map(d => ({
        ...d,
        dateLabel: formatDate(d.date)
    }));

    return (
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-5 w-full max-w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-4 sm:mb-6 border border-orange-100 flex flex-col">
            <h1 className="text-base sm:text-lg md:text-xl capitalize font-bold mb-2 sm:mb-3 text-[#ff4d2d]">
                All Deliveries (By Day)
            </h1>
            <div className="flex-1 min-h-[150px] sm:min-h-[175px] w-full">
                <ResponsiveContainer width="100%" height={180} minWidth={180}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="dateLabel"
                            fontSize={9}
                            interval={0}
                            dx={-6}
                            tick={{ fontWeight: 'bold' }}
                        />
                        <YAxis
                            dataKey="count"
                            allowDecimals={false}
                            fontSize={11}
                        />
                        <Tooltip
                            formatter={value => [value, 'Deliveries']}
                            labelFormatter={(label, payload) => {
                                const entry = payload?.[0]?.payload;
                                const isoDate = entry?.date || '';
                                return `${formatDate(isoDate)}`;
                            }}
                        />
                        <Bar dataKey="count" fill="#ff4d2d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    Total Earnings
                </span>
                <span className="text-base sm:text-lg font-bold text-green-600">
                    ₹{totalEarning.toLocaleString()}
                </span>
            </div>
        </div>
    );
}

export default AllDelivery
