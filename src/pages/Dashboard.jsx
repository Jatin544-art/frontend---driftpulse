import MetricCard from "../components/MetricCard"
import TrendChart from "../components/TrendChart"
import DonutChart from "../components/DonutChart"
import DeviceTable from "../components/DeviceTable"

export default function Dashboard(){

return(

<div className="p-6 space-y-6">

<h1 className="text-2xl font-bold">
Security Operations Center
</h1>

<div className="grid grid-cols-4 gap-4">

<MetricCard title="Total Devices" value="1284" color="text-cyan-400"/>
<MetricCard title="High Risk Devices" value="42" color="text-red-400"/>
<MetricCard title="Avg Trust Score" value="88.5" color="text-green-400"/>
<MetricCard title="Active Alerts" value="12" color="text-yellow-400"/>

</div>

<div className="grid grid-cols-3 gap-4">

<div className="col-span-2">
<TrendChart/>
</div>

<DonutChart/>

</div>

<DeviceTable/>

</div>

)

}
