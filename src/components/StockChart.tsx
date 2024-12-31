import ReactECharts from "echarts-for-react";

export default function StockChart({ data }: { data: { recurso: string; stock: number }[] }) {
  const options = {
    title: { text: "Stock de Recursos", left: "center" },
    xAxis: { type: "category", data: data.map((item) => item.recurso) },
    yAxis: { type: "value" },
    series: [
      {
        data: data.map((item) => item.stock),
        type: "bar",
        itemStyle: { color: "#1E90FF" },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px" }} />;
}
