import * as echarts from 'echarts'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const Chartpie = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current && data) {
      const myChart = echarts.init(chartRef.current)

      const option = {
        tooltip: {
          trigger: 'item',
          show: false,
        },
        legend: {
          top: '30%',
          left: '75%',
          itemWidth: 20,
          itemHeight: 14,
          itemGap: 18,
          textStyle: {
            color: '#333',
            fontSize: 13,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: data.datasets[0].data.map((value, index) => ({
              value,
              name: data.labels[index],
            })),
          },
        ],
        graphic: {
          elements: [
            {
              type: 'text',
              style: {
                text: 'Skills Experience',
                font: 'bold 14px Arial ',
                fill: '#333',
              },
              left: 'center',
              top: '85%',
            },
          ],
        },
      }

      myChart.setOption(option)

      // Cleanup chart when component unmounts
      return () => {
        myChart.dispose()
      }
    }
  }, [data])

  return (
    <div
      ref={chartRef}
      style={{ width: '800px', height: '390px', right: '200px' }}
    />
  )
}

Chartpie.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.number),
        backgroundColor: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
}

export default Chartpie
