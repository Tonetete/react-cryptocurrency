
import { Component } from 'react'
import { Table } from 'react-bootstrap'
import API from '../../services/api'
import { setTotalBenefit } from '../../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CoinList extends Component {
  constructor (props) {
    super(props)
    this.state = { ...props }
    this.getCoinsItems()
  }

  getCoinsItems () {
    const api = new API()
    api.getCoinValues().then(values => {
      this.cryptoCoinsInfo = values
      this.setState({ cryptoCoinsInfo: values })
    })
  }

  sortByRankCoins (arrayCoins) {
    return arrayCoins.sort((coin1, coin2) => {
      return parseInt(coin1[0].rank) > parseInt(coin2[0].rank)
    })
  }

  formatNumber (coinValue) {
    const parsedCoinValue = parseFloat(coinValue).toFixed(5)
    return parseFloat(parsedCoinValue).toLocaleString()
  }

  getQuantityWalletCryptoCurrency (id) {
    switch (id) {
      case 'cardano':
        return 1532
      case 'tron':
        return 4720
      case 'experience-points':
        return 32789
      default:
        return 0.0
    }
  }

  getValueWalletCryptoCurrency (price, id) {
    const quantity = this.getQuantityWalletCryptoCurrency(id)
    return { quantity, value: parseFloat(parseFloat(price * quantity).toFixed(2)) }
  }

  render () {
    if (!this.state.cryptoCoinsInfo) {
      return <div>Loading...</div>
    }

    let totalBenefitEUR = 0
    let totalBenefitUSD = 0
    const listCoins = this.sortByRankCoins(this.state.cryptoCoinsInfo).map((coin) => {
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
        <td className='col-md-2'>{ coinEUR.quantity }</td>
        <td className='col-md-2'>{coinUSD.value.toLocaleString()}$ ({coinEUR.value.toLocaleString()}€)</td>
      </tr>)
    })
    this.props.setTotalBenefit({
      totalBenefitEUR: totalBenefitEUR.toLocaleString(),
      totalBenefitUSD: totalBenefitUSD.toLocaleString()
    })

    return (
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
          {listCoins}
        </tbody>
      </Table>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     totalBenefitUSD: state.totalBenefitUSD
//     totalBenefitEUR: state.totalBenefitEUR
//   };
// }

function mapDispatchToProps (dispatch) {
  // Whenever selectBook is called, the result should be
  // passed to all reducers
  return bindActionCreators({ setTotalBenefit: setTotalBenefit }, dispatch)
}

export default connect(null, mapDispatchToProps)(CoinList)
