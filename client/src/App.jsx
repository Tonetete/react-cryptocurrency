import { Component } from 'react';
import { connect } from 'react-redux';
import CoinList from './components/CoinList/coin_list';
import Register from './components/auth/register';
import { logoutUser } from './actions/index';
import { Button } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'react-cryptocurrencies'
    };
  }

  render() {
    let totalBenefit = null;

    if (this.props.totalBenefitUSD !== {}) {
      totalBenefit = (
        <h3>
          Total benefit {this.props.totalBenefitUSD}$ (
          {this.props.totalBenefitEUR}
          €)
        </h3>
      );
    }

    const buttonRegister = <Button>Register</Button>;

    return (
      <div className="App">
        <h1>Welcome to {this.state.name}</h1>
        <CoinList />
        {totalBenefit}
        <a onClick={() => this.props.logoutUser()}>Logout User</a>
        <Register buttonRegister={buttonRegister} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalBenefitUSD: state.totalBenefit.totalBenefitUSD,
    totalBenefitEUR: state.totalBenefit.totalBenefitEUR
  };
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
