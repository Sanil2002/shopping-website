'use client';

import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

//static data on revenue and sales is provided as JSON file and is imported from utilities.
import {SalesData} from '../../Utilities/SalesData'


interface CustomTooltipProps {
    active?: boolean,
    payload?: Array<{
        name: string,
        value: number,
    }>,
    label?: string
}

const LineChartComponent = () => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={SalesData} margin={{ right: 30 }}>
                <YAxis />
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="5 5" />

                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                <Line type="monotone" dataKey="sales" stroke='#8b5cf6'/>  

            </LineChart>
        </ResponsiveContainer>
    )
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    revenue:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Sales:
                    <span className="ml-2">${payload[1].value}</span>
                  </p>
            </div>
        );
    }
};

export default LineChartComponent