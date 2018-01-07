
import { Component } from 'react'
import { Table } from 'react-bootstrap'
// import API from '../../services/api'
import { setTotalBenefit, getCoinsUser } from '../../actions/index'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import ReactInterval from 'react-interval'

class CoinList extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
    this.props.getCoinsUser()
  }

  buildListCoins (coins) {
    let totalBenefitEUR = 0
    let totalBenefitUSD = 0
    const list = this.sortByRankCoins(coins).map((coin) => {
      const coinUSD = this.getValueWalletCryptoCurrency(coin[0].price_usd, coin[0].id)
      const coinEUR = this.getValueWalletCryptoCurrency(coin[0].price_eur, coin[0].id)
      totalBenefitEUR += coinEUR.value
      totalBenefitUSD += coinUSD.value

      return (<tr key={coin[0].id}>
        <td className='col-md-2'>{coin[0].rank}</td>
        <td className='col-md-2'>{coin[0].name} ({coin[0].symbol})</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].market_cap_usd)}$</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].price_usd)}$ ({this.formatNumber(coin[0].price_eur)})€</td>
        <td className='col-md-2'>{this.formatNumber(coin[0]['24h_volume_usd'])}$</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].available_supply)}$</td>
        <td className='col-md-2' style={{ color: coin[0].percent_change_24h < 0 ? 'red' : '#77ed77' }}>{coin[0].percent_change_24h}%</td>
        <td className='col-md-2'>{this.formatNumber(coinEUR.quantity)}</td>
        <td className='col-md-2'>{this.formatNumber(coinUSD.value)}$ ({this.formatNumber(coinEUR.value)}€)</td>
      </tr>)
    })
    return {
      list,
      totalBenefitEUR: this.formatNumber(totalBenefitEUR),
      totalBenefitUSD: this.formatNumber(totalBenefitUSD)
    }
  }

  sortByRankCoins (arrayCoins) {
    return arrayCoins.sort((coin1, coin2) => {
      return parseInt(coin1[0].rank) > parseInt(coin2[0].rank)
    })
  }

  formatNumber (coinValue) {
    const parsedCoinValue = parseFloat(coinValue)
    const numZeros = parsedCoinValue !== 0 ? -Math.floor(Math.log(parsedCoinValue) / Math.log(10) + 1) : 0
    return numZeros > 1 ? parseFloat(parsedCoinValue).toFixed(numZeros + 3).toLocaleString() : parsedCoinValue.toLocaleString()
  }

  getQuantityWalletCryptoCurrency (id) {
    switch (id) {
      case 'cardano':
        return 1532
      case 'tron':
        return 4720
      case 'experience-points':
        return 32789
      case 'paccoin':
        return 421698 + 3849742
      default:
        return 0.0
    }
  }

  getValueWalletCryptoCurrency (price, id) {
    const quantity = this.getQuantityWalletCryptoCurrency(id)
    const value = price * quantity
    return { quantity, value: value }
  }

  componentWillUpdate () {
    console.log('componentWillUpdate!', this.props.coinsUser)
    if (this.props.coinsUser !== {}) {
      console.log('state change!')
      this.coins = this.buildListCoins(this.props.coinsUser)
      console.log('this.coins', this.coins)
      this.props.setTotalBenefit({
        totalBenefitEUR: this.coins.totalBenefitEUR,
        totalBenefitUSD: this.coins.totalBenefitUSD
      })
    }
  }

  render () {
    if (!this.coins) {
      return <div>Loading...</div>
    }
    console.log('lets render!', this.coins)
    return (
      <div>
        {/* <ReactInterval timeout={80000} callback={this.init()} /> */}
        <Table responsive>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Market Cap</th>
              <th scope='col'>Price</th>
              <th scope='col'>Volume (24h)</th>
              <th scope='col'>Circulating Supply</th>
              <th scope='col'>Change (24h)</th>
              <th scope='col'>Quantity you own</th>
              <th scope='col'>Value of your wallet</th>
            </tr>
          </thead>
          <tbody>
            {this.coins.list}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state', state)
  return {
    coinsUser: state.coinsUser.coins
  }
}
export default connect(mapStateToProps, { setTotalBenefit, getCoinsUser })(CoinList)
