import { useEffect, useState } from "react";
import { AreaChart, 
    Area, 
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid, 
    Tooltip,
    Legend} from "recharts";
import { getAllProducts, initDB } from "../../Utilities/db";


    interface CustomTooltipProps {
        active?:boolean,
        payload?:Array<{
            name:string,
            value:number,
        }>,
        label?:string
    }


const AreaChartComponent = () => {
  const [ storeitems,setStoreItems ] = useState();

  
  //Fetching the products to be displayed from IndexedDB

  useEffect(() => {
    const fetchProducts = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setStoreItems(productsFromDB);
     
    };

    fetchProducts();
  }, []);



    return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={500} height={400} data={storeitems} margin={{right:30}}>
             <YAxis />
             <XAxis dataKey="id" />
             <CartesianGrid strokeDasharray="5 5"/>

             <Tooltip content={<CustomTooltip />}/>
             <Legend />
             <Area 
               type="monotone"  
               dataKey="price"
               stroke="#3b82f6"
               fill="#8b5cf6" 
               stackId='1' />

               <Area 
               type="monotone"  
               dataKey="id"
               stroke='#8b5cf6'
               fill="#8b5cf6"
               stackId='1'  />   

          </AreaChart>
        </ResponsiveContainer>
    )
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-gray-800 flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg text-yellow-300">{label}</p>
          <p className="text-sm text-white">
            Price:
            <span className="ml-2">${payload[0].value}</span>
          </p>
          <p className="text-sm text-yellow-300">
            id:
            <span className="ml-2">{payload[1].value}</span>
          </p>
        </div>
      );
    }
};

export default AreaChartComponent