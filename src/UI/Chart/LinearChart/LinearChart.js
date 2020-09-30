import React from 'react';
import Chart from 'chart.js/dist/Chart.min';
import classes from './LinearChart.module.scss'

class LinearChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myChart  = null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.datasets !== nextProps.datasets || this.props.labels !== nextProps.labels;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.props.datasets.forEach((dataset, datasetIndex)=>{
            if(dataset.data.length === this.myChart.data.datasets[datasetIndex].data.length){
                this.myChart.data.datasets[datasetIndex].data.shift();
            }

            const newData = dataset.data[dataset.data.length-1];
            this.myChart.data.datasets[datasetIndex].data.push(newData);
        });

        this.myChart.data.labels =this.props.labels;
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
                type: 'line',
                options: {
                    title: {
                        display: true,
                        text: this.props.title ?? ''
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    display: false
                                }
                            }
                        ],
                        yAxes: [
                            {}
                        ]
                    }
                },
                data: {
                    labels: this.props.labels ?? [],
                    datasets: this.props.datasets ?? [],
                }
            }
        );
    }

    render() {
        return (
            <div className={classes.LinearChart}>
                <canvas ref={this.chartRef}/>
            </div>
        );
    }
}

export default LinearChart;
