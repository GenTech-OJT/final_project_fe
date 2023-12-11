import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import 'echarts/lib/chart/pie' // Import chart type

const ChartPie = () => {
  useEffect(() => {
    // Khi component được render, vẽ biểu đồ
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
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
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    }

    option && myChart.setOption(option)

    // Cleanup: Destroy chart instance when the component unmounts
    return () => {
      myChart.dispose()
    }
  }, [])

  return <div id="main" style={{ width: '600px', height: '400px' }} />
}

export default ChartPie
