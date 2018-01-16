import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import PropTypes from 'prop-types';

import {
  ScreenWrapper,
  Button,
  Heading,
  Text,
  View,
  List,
  CenterView,
  RefreshControl,
} from '../../../common/components';
import TxActionSelect from './TxActionSelect';
import { DEFAULT_TX_ACTION } from '../constants';
import {
  satoshiToBitcoin,
  getExploreTxUrl,
  getTxConfirmationStatus,
  getTxDateTime,
} from '../../../btcService';

export default class Transactions extends Component {
  static propTypes = {
    network: PropTypes.string.isRequired,
    txs: PropTypes.array.isRequired,
    onRefresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    txAction: DEFAULT_TX_ACTION,
  };

  getTxs = () => this.props.txs.filter(({ action }) => action === this.state.txAction);

  keyExtractor = tx => tx.txid;

  openExplorer = tx => {
    Linking.openURL(getExploreTxUrl(tx.txid, this.props.network)).catch(err =>
      console.error('An error occurred', err)
    );
  };

  renderItem = ({ item }) => <TxItem tx={item} onExplorePress={this.openExplorer} />;

  render() {
    const { isLoading, onRefresh } = this.props;
    const { txAction } = this.state;

    const txs = this.getTxs();

    return (
      <ScreenWrapper scrollEnabled={false}>
        <Heading>Transactions</Heading>

        <TxActionSelect onChange={txAction => this.setState({ txAction })} value={txAction} />

        {txs.length > 0 && (
          <List
            data={txs}
            extraData={txAction}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
          />
        )}

        {txs.length === 0 && (
          <CenterView>
            <Text>No transactions</Text>
          </CenterView>
        )}
      </ScreenWrapper>
    );
  }
}

const TxItem = ({ tx, onExplorePress }) => {
  const { confirmations, status } = getTxConfirmationStatus(tx);
  const txDateTime = getTxDateTime(tx);

  return (
    <View style={styles.item}>
      {tx.addressTo && <Text>To address: {tx.addressTo}</Text>}
      <Text>
        Status: {status} ({confirmations} confirmations)
      </Text>
      <Text>Amount: {satoshiToBitcoin(tx.amount)} BTC</Text>
      <Text>Date: {txDateTime}</Text>
      <Text>Fee: {satoshiToBitcoin(tx.fees)} BTC</Text>
      <Text>ID: {tx.txid}</Text>
      <Button
        onPress={() => onExplorePress(tx)}
        title="Explore"
        type="default"
        size="sm"
        style={styles.button}
      />
    </View>
  );
};

TxItem.propTypes = {
  tx: PropTypes.object.isRequired,
  onExplorePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
});
