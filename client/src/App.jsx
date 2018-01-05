import { Component } from 'react'
import { connect } from 'react-redux'
import CoinList from './components/CoinList/coin_list'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'react-cryptocurrencies'
    }
  }

  render () {
    return (
      <div className='App'>
        <h1>Welcome to {this.state.name}</h1>
        <CoinList />
        <h3>Total benefit {this.props.totalBenefitUSD}$ ({this.props.totalBenefitEUR})€</h3>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    totalBenefitUSD: state.totalBenefit.totalBenefitUSD,
    totalBenefitEUR: state.totalBenefit.totalBenefitEUR
  }
}

export default connect(mapStateToProps)(App)
