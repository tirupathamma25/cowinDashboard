import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationDays} = props
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart width={1000} height={300} data={vaccinationDays}>
      <XAxis dataKey="vaccineDate" />
      <YAxis tickFormatter={dataFormatter} />
      <Tooltip />
      <Legend />
      <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" />
      <Bar dataKey="dose2" name="Dose 2" fill="#f54394" />
    </BarChart>
  )
}
export default VaccinationCoverage
