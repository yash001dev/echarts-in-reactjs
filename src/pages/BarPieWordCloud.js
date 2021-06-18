import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosCheckmark, IoIosRefresh } from "react-icons/io";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { useImmer } from "use-immer";

import ECharts from "../Echarts/ECharts";
import "echarts-wordcloud";

import {
  getBarOptions,
  getPieOptions,
  PieToolbox,
  WordCloudOptions
} from "../Echarts/ChartsOptions";
import ChartWrapper from "../Echarts/ChartWrapper";

const initialBar = {
  data: [],
  error: undefined,
  loading: true,
  vertical: false
};

const initialPie = { data: [], error: undefined, loading: true };

export default function BarPieWordCloud() {
  const [barData, setBarData] = useImmer(initialBar);
  const [pieData, setPieData] = useImmer(initialPie);
  const [wordData, setWordData] = useImmer(initialPie);

  useEffect(() => {
    getBarChart(); // API
    getPieChart(); // API
    getWordCloud();
  }, []);

  // to vertical the chart
  useEffect(() => {
    if (barData.data) {
      setBarData((draft) => ({
        ...draft,
        data: {
          ...draft.data,
          xAxis: draft.data.yAxis,
          yAxis: draft.data.xAxis
        }
      }));
    }
  }, [barData.vertical]);

  function changeVertical() {
    setBarData((draft) => ({ ...draft, vertical: !draft.vertical }));
  }

  function getBarChart() {
    setBarData((draft) => ({ ...draft, loading: true }));
    setTimeout((res) => {
      const labels = ["a", "b", "c"];
      const datasets = [
        {
          name: "Chart 1",
          type: barData.vertical ? "bar" : "line",
          smooth: true,
          data: [10, 50, 20]
        },
        {
          name: "Chart 2",
          type: barData.vertical ? "bar" : "line",
          smooth: true,
          data: [20, 10, 30]
        }
      ];

      const barOptions = getBarOptions(datasets, labels);

      setBarData({
        data: barOptions,
        error: false,
        loading: false,
        vertical: false
      });
    }, 2000);
  }

  function getPieChart() {
    setPieData((prev) => ({ ...prev, loading: true }));
    setTimeout((res) => {
      const pieOptions = getPieOptions([
        { name: "Type 1", value: 20 },
        { name: "Type 2", value: 30 }
      ]);

      setPieData({
        data: pieOptions,
        error: false,
        loading: false
      });
    }, 2000);
  }

  function getWordCloud() {
    setWordData((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      const cloudOptions = {
        tooltip: {
          show: true
        },
        toolbox: PieToolbox,
        series: [
          {
            ...WordCloudOptions,
            data: [
              {
                name: "Tag 1",
                value: 30
              },
              {
                name: "Tag 2",
                value: 23
              },
              {
                name: "Tag 3",
                value: 20
              }
            ]
          }
        ]
      };

      setWordData({
        data: cloudOptions,
        error: false,
        loading: false
      });
    }, 3000);
  }

  const barchartMenus = (id) => [
    {
      title: "Add to Create Alert",
      icon: IoIosAdd,
      size: 24,
      // fn: () => {}
      showInMore: false
      // hide: hideChart1Alert(id)
    },
    {
      title: "Added to Alerts",
      icon: IoIosCheckmark,
      size: 24,
      showInMore: false
      // hide: !hideChart1Alert(id)
    },
    {
      title: "Refresh",
      icon: IoIosRefresh,
      fn: () => getBarChart(),
      showInMore: false
    },
    {
      title: "Toggle Horizontal/Vertical",
      fn: changeVertical,
      showInMore: true
    }
  ];

  const piechartMenus = (id) => [
    {
      title: "Add Chart",
      icon: IoIosAdd,
      size: 24,
      fn: () => {}, // function to call
      showInMore: false
      // hide: hideAddChart(id)
    },
    {
      title: "Checkmark",
      icon: IoIosCheckmark,
      size: 24,
      showInMore: false
      // hide: !hideCheckmark(id)
    },
    {
      title: "Refresh",
      icon: IoIosRefresh,
      fn: () => getPieChart(),
      showInMore: false
    }
  ];

  const wordCloudMenus = (id) => [
    {
      title: "Add",
      icon: IoIosAdd,
      size: 24,
      // fn: () => {},
      showInMore: false
      // hide: hideChart2Alert(id)
    },
    {
      title: "Refresh",
      icon: IoIosRefresh,
      // fn: () => {},
      showInMore: false
    }
  ];

  return (
    <Row>
      <Col md="8">
        <ChartWrapper title="Mentions Over Time" menus={barchartMenus("none")}>
          <ECharts
            xLabel={barData.labels}
            loading={barData.loading}
            options={barData.data}
          />
        </ChartWrapper>
      </Col>
      <Col md="4">
        <ChartWrapper title="Share of Mentions" menus={piechartMenus("none")}>
          <ECharts loading={pieData.loading} options={pieData.data} />
        </ChartWrapper>
      </Col>
      <Col md="4">
        <ChartWrapper title="Top Tags" menus={wordCloudMenus()}>
          <ECharts
            loading={wordData.loading}
            options={wordData.data}
            message={barData.error}
          />
        </ChartWrapper>
      </Col>
    </Row>
  );
}
