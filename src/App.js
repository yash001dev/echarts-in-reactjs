import React, { useEffect } from "react";
import * as echarts from "echarts";

import BarPieWordCloud from "./pages/BarPieWordCloud";

import WesterosTheme from "./Echarts/WesterosTheme.json";
import "./styles.css";

export default function App() {
  useEffect(() => {
    // theme for echart
    echarts.registerTheme("westeros", WesterosTheme);
  }, []);

  return (
    <div className="App">
      <BarPieWordCloud />
    </div>
  );
}
