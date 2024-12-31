import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function StockChart({
  data,
}: {
  data: { recurso: string; stock: number }[];
}) {
  const [colors, setColors] = useState({
    text: "#374151", // text-gray-700 (modo claro)
    axis: "#6B7280", // text-gray-500 (modo claro)
  });

  // Detectar el modo oscuro/claro
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleChange = () => {
      if (darkModeMediaQuery.matches) {
        setColors({
          text: "#D1D5DB", // dark:text-gray-300
          axis: "#9CA3AF", // dark:text-gray-500
        });
      } else {
        setColors({
          text: "#374151", // text-gray-700
          axis: "#6B7280", // text-gray-500
        });
      }
    };

    handleChange(); // Configurar colores iniciales
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const options = {
    title: {
      text: "Stock de Recursos",
      left: "center",
      textStyle: {
        color: colors.text, // Color dinámico para el título
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.recurso),
      axisLine: {
        lineStyle: {
          color: colors.axis, // Color dinámico para el eje X
        },
      },
      axisLabel: {
        textStyle: {
          color: colors.text, // Color dinámico para las etiquetas del eje X
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: colors.axis, // Color dinámico para el eje Y
        },
      },
      axisLabel: {
        textStyle: {
          color: colors.text, // Color dinámico para las etiquetas del eje Y
        },
      },
      splitLine: {
        lineStyle: {
          color: colors.axis, // Color dinámico para las líneas de división
        },
      },
    },
    series: [
      {
        data: data.map((item) => item.stock),
        type: "bar",
        itemStyle: {
          color: "#1E90FF", // Color de las barras
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px" }} />;
}
