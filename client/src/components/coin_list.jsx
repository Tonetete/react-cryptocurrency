
import { Component } from 'react'
import { Table } from 'react-bootstrap'
import API from '../services/api'

class CoinList extends Component {
  constructor (props) {
    super(props)
    this.state = props
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

  getValueWalletCryptoCurrency (price, quantity, id) {
    if (id === 'cardano') {
      quantity = 1532
    } else if (id === 'tron') {
      quantity = 4725
    }
    return parseFloat(parseFloat(price * quantity).toFixed(2)).toLocaleString()
  }

  render () {
    if (!this.state.cryptoCoinsInfo) {
      return <div>Loading...</div>
    }

    const listCoins = this.sortByRankCoins(this.state.cryptoCoinsInfo).map((coin) => {
      return (<tr key={coin[0].id}>
        <td className='col-md-2'>{coin[0].rank}</td>
        <td className='col-md-2'>{coin[0].name}({coin[0].symbol})</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].market_cap_usd)}$</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].price_usd)}$ ({this.formatNumber(coin[0].price_eur)})€</td>
        <td className='col-md-2'>{this.formatNumber(coin[0]['24h_volume_usd'])}$</td>
        <td className='col-md-2'>{this.formatNumber(coin[0].available_supply)}$</td>
        <td className='col-md-2' style={{ color: coin[0].percent_change_24h < 0 ? 'red' : 'green' }}>{coin[0].percent_change_24h}%</td>
        <td className='col-md-2'>{ coin[0].id === 'cardano' ? 1532 : 0.0 }</td>
        <td className='col-md-2'>{this.getValueWalletCryptoCurrency(coin[0].price_usd, 0.0, coin[0].id) }$
        ({this.getValueWalletCryptoCurrency(coin[0].price_eur, 0.0, coin[0].id)}€)</td>
      </tr>)
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
export default CoinList
