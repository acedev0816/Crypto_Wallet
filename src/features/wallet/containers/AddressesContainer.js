import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectIsInProgress } from '../../spinner/ducks';
import { apiCallIds } from '../constants';
import { getAddressesActions, selectActiveWallet, selectActiveWalletExtraData } from '../ducks';
import Addresses from '../components/Addresses';
import NoActiveWallet from '../components/NoActiveWallet';

const mapStateToProps = state => ({
  activeWallet: selectActiveWallet(state),
  activeWalletExtraData: selectActiveWalletExtraData(state),
  isLoading: selectIsInProgress(state, apiCallIds.GET_ADDRESSES),
});

const mapDispatchToProps = {
  getAddresses: getAddressesActions.request,
};

class AddressesContainer extends Component {
  static propTypes = {
    activeWallet: PropTypes.object,
    activeWalletExtraData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    getAddresses: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: 'Addresses',
  };

  componentWillMount() {
    this.props.getAddresses();
  }

  render() {
    const { activeWallet, activeWalletExtraData, isLoading, getAddresses } = this.props;

    if (!activeWallet) {
      return <NoActiveWallet />;
    }

    return (
      <Addresses
        network={activeWallet.network}
        addresses={activeWalletExtraData.addresses}
        onRefresh={getAddresses}
        isLoading={isLoading}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressesContainer);
