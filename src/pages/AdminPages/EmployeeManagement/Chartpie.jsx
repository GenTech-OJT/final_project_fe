import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

const Chartpie = ({ data }) => {
  return (
    <div>
      <Doughnut
        data={data}
        options={{
          cutoutPercentage: 70,
          legend: {
            display: false,
          },
        }}
      />
    </div>
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
