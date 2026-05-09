import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ProgressChart({

  data

}){

  return(

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart data={data}>

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="calories"
          stroke="#00ff88"
        />

      </LineChart>

    </ResponsiveContainer>
  );
}

export default ProgressChart;