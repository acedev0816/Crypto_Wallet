import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPricesActions, selectPriceForActiveWallet } from '../../price/ducks';
import { FETCH_BALANCE_INTERVAL_MS, FETCH_PRICES_INTERVAL_MS } from '../constants';
import { selectActiveWallet, getBalanceActions } from '../ducks';
import WalletSummary from '../components/WalletSummary';

const mapStateToProps = state => ({
  wallet: selectActiveWallet(state),
  prices: selectPriceForActiveWallet(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getBalance: getBalanceActions.request,
      getPrices: getPricesActions.request,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class WalletSummaryContainer extends Component {
  static propTypes = {
    wallet: PropTypes.object,
    prices: PropTypes.object,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (this.props.wallet) {
      this.startFetching();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.wallet &&
      (!this.props.wallet || nextProps.wallet.walletId !== this.props.wallet.walletId)
    ) {
      this.startFetching();
    } else if (!nextProps.wallet) {
      this.stopFetching();
    }
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  startFetching = () => {
    this.stopFetching();
    const { actions } = this.props;

    actions.getBalance();
    actions.getPrices();

    this.balanceInterval = setInterval(actions.getBalance, FETCH_BALANCE_INTERVAL_MS);
    this.pricesInterval = setInterval(actions.getPrices, FETCH_PRICES_INTERVAL_MS);
  };

  stopFetching = () => {
    clearInterval(this.balanceInterval);
    clearInterval(this.pricesInterval);
  };

  render() {
    const { wallet, prices } = this.props;

    return <WalletSummary wallet={wallet} price={prices ? prices.USD : undefined} />;
  }
}
