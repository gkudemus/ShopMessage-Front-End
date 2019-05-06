import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';
import axios from 'axios';

class RadarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
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

  render() {
      return (
        <div className="chart">
          <h3>Radar Chart Component</h3><hr /><br />
          <Radar
            data={this.state.chartData}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
      );


  }
}

export default RadarChart;
