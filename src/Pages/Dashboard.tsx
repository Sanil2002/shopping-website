import AreaChartComponent from '../Components/Charts/AreaChart';
import BarChartComponent from '../Components/Charts/BarChart';
import LineChartComponent from '../Components/Charts/LineChart';
import Table from '../Components/Table';
import { Stats } from '../Components/Stats';
import { Dashboardremcomponents } from '../Components/Dashboardremcomponents';
import { Loading } from '../Utilities/Loading';

interface GridItemProps {
  title: string;
  children: React.ReactNode;  // `children` is of type `React.ReactNode`, representing any nested components or elements.
  cl: string;   //`cl` is for adding extra tailwind css classes, if needed.
}

function Dashboard() {

  //GridItem is a sub-component which takes title,children and cl as props for building grid for the charts.
  const GridItem: React.FC<GridItemProps> = ({ title, children, cl }) => {
    return (
      <div className={`flex flex-col p-4 ${cl} rounded-xl h-[400px] hover:-translate-y-3 duration-300`}>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    );
  };

  return (
    <div>
      <Loading />
      <div className='flex flex-col'>
        <Stats />
        <div className="min-h-[400px] flex flex-col items-center py-24">
          <div className='w-full'>
            <div className="grid xl:grid-cols-2 lg:grid-cols-1 w-full gap-12 px-3 py-5 flex-row">
              <GridItem title="Data on current Products" cl="bg-white font-xl text-center shadow-xl">
                <AreaChartComponent />
              </GridItem>
              <GridItem title="Sales Chart" cl="bg-black text-center text-white shadow-2xl">
                <LineChartComponent />
              </GridItem>
            </div>
          </div>
        </div>       
        <Dashboardremcomponents />
        <div className="min-h-[300px] flex flex-col items-center py-5">
          <div className="flex w-full items-center justify-center pb-14">
            <div className="grid xl:grid-cols-2 lg:grid-cols-1 w-full gap-12 px-5">
              <GridItem title="Live Market" cl="bg-black text-white text-center shadow-2xl">
                <BarChartComponent />
              </GridItem>
              <div className="flex min-w-full flex-col items-center justify-center p-4 bg-slate-50 rounded-xl h-[400px] shadow-xl hover:-translate-y-3 duration-700">
                <Table />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
