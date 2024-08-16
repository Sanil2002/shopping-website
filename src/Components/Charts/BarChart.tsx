'use client'

import { BarChart, 
  Bar, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid, 
  Tooltip,
  Legend} from "recharts";
  import useProductData from "../../hooks/UseProductData";
  
  interface CustomTooltipProps {
        active?:boolean,
        payload?:Array<{
          name:string,
          value:number,
        }>,
        label?:string
    }
  
const BarChartComponent = () => {

    // Calling the `useProductData` hook to fetch the product data. This data will be used as the input for the BarChart.
    const ProductData = useProductData();

    return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ProductData} margin={{right:30}}>
             <YAxis />
             <XAxis dataKey="symbol" />
             <CartesianGrid strokeDasharray="5 5"/>

             <Tooltip content={<CustomTooltip />}/>
             <Legend />
             <Bar dataKey="price" fill='#faf020' />
             {/* <Bar dataKey="profit" fill="#ffffff"/>   */}

          </BarChart>
        </ResponsiveContainer>
    )
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-blue-400">
            Price:
            <span className="ml-2">${payload[0].value}</span>
          </p>
        </div>
      );
    }
  };

export default BarChartComponent



