import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./App.css";

const data = [
  {
    key: "revenue",
    label: "Выручка, руб",
    today: 500521,
    yesterday: 480521,
    week: 4805121,
    chart: [100000, 300000, 400000, 450000, 420000, 390000, 500521],
  },
  {
    key: "cash",
    label: "Наличные",
    today: 300000,
    yesterday: 300000,
    week: 300000,
    chart: [0, 300000, 0, 0, 0, 0, 0],
  },
  {
    key: "noneCash",
    label: "Безналичный расчет",
    today: 100000,
    yesterday: 100000,
    week: 100000,
    chart: [0, 100000, 0, 0, 0, 0, 0],
  },

  {
    key: "creditCard",
    label: "Кредитные карты",
    today: 100521,
    yesterday: 100521,
    week: 100521,
    chart: [0, 100521, 0, 0, 0, 0, 0],
  },
  {
    key: "avgCheck",
    label: "Средний чек, руб",
    today: 1300,
    yesterday: 900,
    week: 900,
    chart: [700, 800, 1000, 950, 900, 850, 1300],
  },
  {
    key: "avgGuest",
    label: "Средний гость, руб",
    today: 1200,
    yesterday: 800,
    week: 800,
    chart: [600, 650, 700, 750, 800, 900, 1200],
  },

  {
    key: "delAfter",
    label: "Удаление из чека (после оплаты) руб.",
    today: 1200,
    yesterday: 1100,
    week: 900,
    chart: [1100, 1200, 700, 750, 800, 900, 1200],
  },

  {
    key: "delBefore",
    label: "Удаление из чека (до оплаты) руб.",
    today: 1300,
    yesterday: 1300,
    week: 900,
    chart: [1300, 1300, 700, 750, 800, 900, 1200],
  },

  {
    key: "checks",
    label: "Количество чеков",
    today: 34,
    yesterday: 36,
    week: 34,
    chart: [28, 30, 32, 31, 35, 36, 34],
  },
  {
    key: "countGuest",
    label: "Количество гостей",
    today: 34,
    yesterday: 36,
    week: 32,
    chart: [28, 30, 32, 31, 35, 36, 34],
  },
];

function formatNumber(n) {
  return n.toLocaleString("ru-RU");
}

function getDiff(today, yesterday) {
  const diff = ((today - yesterday) / yesterday) * 100;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff.toFixed(0)}%`;
}

function App() {
  const [selectedKey, setSelectedKey] = useState("revenue");
  console.log(selectedKey);
  const selectedRow = data.find((row) => row.key === selectedKey);

  const chartOptions = {
    title: { text: selectedRow.label },
    xAxis: { categories: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] },
    yAxis: { title: { text: selectedRow.label } },
    series: [{ name: selectedRow.label, data: selectedRow.chart }],
  };

  console.log(chartOptions);

  return (
    <div className="container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const diff = getDiff(row.today, row.yesterday);
            const diffClass = diff.includes("-")
              ? "red"
              : diff.includes("0%")
              ? "gray"
              : "green";

            return (
              <React.Fragment key={row.key}>
                <tr
                  className={selectedKey === row.key ? "selected" : ""}
                  onClick={() => setSelectedKey(row.key)}
                >
                  <td>{row.label}</td>
                  <td className="today-cell center">
                    {formatNumber(row.today)}
                  </td>
                  <td className={`diff-cell ${diffClass} center`}>
                    {formatNumber(row.yesterday)}{" "}
                    <span className={diffClass}>{diff}</span>
                  </td>
                  <td className={`diff-cell ${diffClass} center`}>
                    {formatNumber(row.week)}
                  </td>
                </tr>
                {row.key === selectedKey && (
                  <tr>
                    <td colSpan={4}>
                      <div className="chart-container">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
