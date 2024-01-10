import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiConstants.initial,
    vaccinationDays: [],
    vaccinationAge: [],
    vaccinationGender: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formattedData = data.last_7_days_vaccination.map(eachDay => ({
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
        vaccineDate: eachDay.vaccine_date,
      }))

      const formattedAge = data.vaccination_by_age.map(eachAge => ({
        age: eachAge.age,
        count: eachAge.count,
      }))

      const formattedGender = data.vaccination_by_gender.map(eachGender => ({
        gender: eachGender.gender,
        count: eachGender.count,
      }))

      this.setState({
        vaccinationDays: formattedData,
        vaccinationAge: formattedAge,
        vaccinationGender: formattedGender,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessField = () => {
    const {vaccinationDays, vaccinationAge, vaccinationGender} = this.state
    return (
      <div>
        <h1 className="vaccination-h1">Vaccination Coverage</h1>
        <VaccinationCoverage vaccinationDays={vaccinationDays} />
        <h1 className="vaccination-h1">Vaccination by gender</h1>
        <VaccinationByGender vaccinationGender={vaccinationGender} />
        <h1 className="vaccination-h1">Vaccination by age</h1>
        <VaccinationByAge vaccinationAge={vaccinationAge} />
      </div>
    )
  }

  renderFailureField = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="co-win-vaccination-h1">Something Went Wrong</h1>
    </div>
  )

  renderFinalAnswer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessField()
      case apiConstants.failure:
        return this.renderFailureField()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard">
        <div className="website-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="co-win-heading">Co-WIN</h1>
        </div>
        <h1 className="co-win-vaccination-h1">CoWIN Vaccination in India</h1>
        <div className="vaccination-data-container">
          {this.renderFinalAnswer()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
