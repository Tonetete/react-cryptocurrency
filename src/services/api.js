
const COINMARKETCAP_URL = 'https://api.coinmarketcap.com/v1/ticker/cryptoCoin/?convert=EUR'

class API {
  constructor () {
    this.cryptoCoinsNames = ['cardano', 'tron', 'bitcoin', 'litecoin', 'ethereum', 'iota']
  }

  getCoinValues () {
    let promises = []
    this.cryptoCoinsNames.map((cryptoCoin) => {
      const URL_COIN = COINMARKETCAP_URL.replace('cryptoCoin', cryptoCoin)
      promises.push(new Promise((resolve, reject) => {
        fetch(URL_COIN, { method: 'GET' }).then((response) => {
          response.json().then((respJSON) => {
            if (respJSON.error) {
              this.manageError(respJSON.error)
              reject(respJSON)
            } else {
              resolve(respJSON)
            }
          })
        })
      }))
    })
    return Promise.all(promises)
  }

  manageError (error) {
    console.log('error', error)
  }
}

export default API
