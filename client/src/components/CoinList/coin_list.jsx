// @flow
import * as React from 'react';
import { Table } from 'react-bootstrap';
import { getCoinsUser } from '../../actions/index';
import { sortByRankCoins } from '../../functions/utils';
import { connect } from 'react-redux';
// import ReactInterval from 'react-interval'

type Props = {
  coinsUser: Array<string>,
  getCoinsUser: () => {}
};

type State = {};

class CoinList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.props.getCoinsUser();
  }

  buildListCoins(): React.Node {
    const list = sortByRankCoins(this.props.coinsUser).map(coin => {
      return (
        <tr key={coin.id}>
          <td className="col-md-2">{coin.rank}</td>
          <td className="col-md-2">
            {coin.name} ({coin.symbol})
          </td>
          <td className="col-md-2">{coin.market_cap_usd}$</td>
          <td className="col-md-2">
            {coin.price_usd}$ ({coin.price_eur}
            )€
          </td>
          <td className="col-md-2">{coin['24h_volume_usd']}$</td>
          <td className="col-md-2">{coin.available_supply}$</td>
          <td
            className="col-md-2"
            style={{ color: coin.percent_change_24h < 0 ? 'red' : '#77ed77' }}
          >
            {coin.percent_change_24h}%
          </td>
          <td className="col-md-2">{coin.quantity}</td>
          <td className="col-md-2">
            {coin.usdValue}$ ({coin.eurValue}
            €)
          </td>
        </tr>
      );
    });

    return list;
  }

  render(): React.Node {
    if (!this.props.coinsUser) {
      return <div>Loading...</div>;
    }

    const listCoins = this.buildListCoins();
    return (
      <div>
        {/* <ReactInterval timeout={80000} callback={this.init()} /> */}
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Market Cap</th>
              <th scope="col">Price</th>
              <th scope="col">Volume (24h)</th>
              <th scope="col">Circulating Supply</th>
              <th scope="col">Change (24h)</th>
              <th scope="col">Quantity you own</th>
              <th scope="col">Value of your wallet</th>
            </tr>
          </thead>
          <tbody>{listCoins}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinsUser: state.coinsUser.coins
});

const mapDispatchToProps = dispatch => ({
  getCoinsUser: () => dispatch(getCoinsUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinList);
