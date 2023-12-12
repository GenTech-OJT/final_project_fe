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
          bottom: '0px',
          left: 'center',
          itemWidth: 20,
          itemHeight: 14,
          itemGap: 18,
          textStyle: {
            color: '#333',
            fontSize: 13,
          },
          type: 'scroll',
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
      style={{ height: '331px', left: '12px', bottom: '30px' }}
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
