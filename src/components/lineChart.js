import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

class LineChart extends Component {

constructor(props) {
  super(props);
  this.state = {
    chartData: {},
    tempChartData: {}
  }
}

static defaultProps = {
  displayLegend: true,
}

componentDidMount() {
   axios.all([
    axios.get('http://localhost:3000/optins'),
    axios.get('http://localhost:3000/recipients')
  ])
    .then(axios.spread((optinResponse, recipientResponse) => {
      const optins = optinResponse.data;
      const recipients = recipientResponse.data;
      const chartData = {
        labels: optins.map(a => a.date),
        datasets: [
          {
            data: optins.map(b => b.count),
            backgroundColor: 'red',
            fill: false,
            label: 'Optins'
          },
          {
            data: recipients.map(c => c.count),
            backgroundColor: 'green',
            fill: false,
            label: 'Recipients'
          }
        ]
      }
      this.setState({ chartData });
    }));
}

handleStartDateChange = e => {
  const target = e.target
  const value = target.value
  const name = target.name
  let tempChartData =  this.state.chartData
  let startdate = ""

  if(name === "startdate"){
    startdate = tempChartData.labels.indexOf(value)
  }

  let removedChartLabels = tempChartData.labels.splice(0, startdate)
  // let removedChartData = tempChartData.datasets.map((idx) => {
  //     idx.data.splice(0, startdate)
  // })


   this.setState({
     ...this.state.chartData, labels: removedChartLabels,
   });

  console.log('start date index:', startdate)
  console.log('indexes removed:', removedChartLabels)
  //console.log(removedChartData)

}

handleEndDateChange = e => {
  const target = e.target
  const value = target.value
  const name = target.name
  let tempChartData =  this.state.chartData
  let enddate = ""

  if(name === "enddate"){
    enddate = tempChartData.labels.indexOf(value)
  }

  let removedChartLabels = tempChartData.labels.splice(enddate)

   this.setState({
     ...this.state.chartData, labels: removedChartLabels
   });

  console.log('start date index:', enddate)
  console.log('indexes removed:', removedChartLabels)

}

handlereset = () => {
 window.location.reload();
}

  render() {
      let {tempChartData} = this.state

      tempChartData = this.state.chartData

      console.log(tempChartData)

      return (
        <div className="chart">
          <h3>Line Chart Component</h3><hr /><br />
          <div style={{float: 'left'}}>
            <button onClick={this.handlereset} style={{marginRight: 10}}>Reset</button>
            <span style={{marginRight: 5}}>Start Date:</span>
            <select onChange={this.handleStartDateChange} name="startdate" style={{marginRight: 10}}>
              <option value="10/01">10/01</option>
              <option value="10/02">10/02</option>
              <option value="10/03">10/03</option>
              <option value="10/04">10/04</option>
              <option value="10/05">10/05</option>
              <option value="10/06">10/06</option>
              <option value="10/07">10/07</option>
              <option value="10/08">10/08</option>
              <option value="10/09">10/09</option>
              <option value="10/10">10/10</option>
              <option value="10/11">10/11</option>
              <option value="10/12">10/12</option>
              <option value="10/13">10/13</option>
              <option value="10/14">10/14</option>
              <option value="10/15">10/15</option>
              <option value="10/16">10/16</option>
              <option value="10/17">10/17</option>
              <option value="10/18">10/18</option>
              <option value="10/19">10/19</option>
              <option value="10/20">10/20</option>
              <option value="10/21">10/21</option>
              <option value="10/22">10/22</option>
              <option value="10/23">10/23</option>
              <option value="10/24">10/24</option>
              <option value="10/25">10/25</option>
              <option value="10/26">10/26</option>
              <option value="10/27">10/27</option>
              <option value="10/28">10/28</option>
              <option value="10/29">10/29</option>
              <option value="10/30">10/30</option>
              <option value="10/31">10/31</option>
            </select>
            <span style={{marginRight: 5}}>End Date:</span>
            <select onChange={this.handleEndDateChange} name="enddate">
              <option value="10/01">10/01</option>
              <option value="10/02">10/02</option>
              <option value="10/03">10/03</option>
              <option value="10/04">10/04</option>
              <option value="10/05">10/05</option>
              <option value="10/06">10/06</option>
              <option value="10/07">10/07</option>
              <option value="10/08">10/08</option>
              <option value="10/09">10/09</option>
              <option value="10/10">10/10</option>
              <option value="10/11">10/11</option>
              <option value="10/12">10/12</option>
              <option value="10/13">10/13</option>
              <option value="10/14">10/14</option>
              <option value="10/15">10/15</option>
              <option value="10/16">10/16</option>
              <option value="10/17">10/17</option>
              <option value="10/18">10/18</option>
              <option value="10/19">10/19</option>
              <option value="10/20">10/20</option>
              <option value="10/21">10/21</option>
              <option value="10/22">10/22</option>
              <option value="10/23">10/23</option>
              <option value="10/24">10/24</option>
              <option value="10/25">10/25</option>
              <option value="10/26">10/26</option>
              <option value="10/27">10/27</option>
              <option value="10/28">10/28</option>
              <option value="10/29">10/29</option>
              <option value="10/30">10/30</option>
              <option value="10/31">10/31</option>
            </select>
          </div>
          <Line
            data={this.state.chartData}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
      );
  }
}

export default LineChart;
