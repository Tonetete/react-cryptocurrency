import { Component } from 'react'
import CoinList from './components/coin_list'
import './App.css'

export default class App extends Component {
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
      </div>
    )
  }
}
