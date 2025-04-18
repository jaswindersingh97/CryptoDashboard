import React from 'react';
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Legend,
  Export,
  Tooltip,
} from 'devextreme-react/chart';
// import { dataSource } from './data.js';

const customizeTooltip = (arg) => ({
  text: `Open: $${arg.openValue}<br/>
Close: $${arg.closeValue}<br/>
High: $${arg.highValue}<br/>
Low: $${arg.lowValue}<br/>`,
});
function CandleChart({data}) {
    console.log(data)
  return (
    <Chart
      id="chart"
      title="Stock Price"
      dataSource={data}
    >
      <CommonSeriesSettings
        argumentField="date"
        type="candlestick"
      />
      <Series
        name="E-Mart"
        openValueField="open"
        highValueField="high"
        lowValueField="low"
        closeValueField="close"
      >
        <Reduction color="red" />
      </Series>
      <ArgumentAxis workdaysOnly={true}>
        <Label format="shortDate" />
      </ArgumentAxis>
      <ValueAxis tickInterval={1}>
        <Title text="US dollars" />
        <Label>
          <Format
            precision={0}
            type="currency"
          />
        </Label>
      </ValueAxis>
      <Legend itemTextPosition="left" />
      <Export enabled={true} />
      <Tooltip
        enabled={true}
        location="edge"
        customizeTooltip={customizeTooltip}
      />
    </Chart>
  );
}
export default CandleChart;
