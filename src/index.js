import { AppRegistry, Platform } from 'react-native';
// import { AsyncStorage } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

import Root from './app/containers/Root';

AppRegistry.registerComponent('bitcoinwallet', () => Root);

if (Platform.OS === 'ios') {
  KeyboardManager.setEnableDebugging(__DEV__);
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}

// setTimeout(() => {
//   AsyncStorage.clear();
// }, 3000);

// TODO
// Transactions in Transaction History are shown from newest to oldest
// User is able to refresh Transaction History by scrolling down
// Transaction detail holds a transaction status
// Transaction detail holds time and date of transaction
// Transaction detail holds transaction ID
// Transaction detail holds address sent TO & address received FROM
// If current address has been used, a new one is automatically generated
// User can set amount to send in BTC, the amount is also displayed in USD
// parse btc amount (,.)
// limit number of decimal places in btc amount to 8

// format USD with https://github.com/ExodusMovement/format-currency
// format BTC with https://github.com/ExodusMovement/number-unit
// BUG in bitcore-lib https://github.com/bitpay/bitcore-lib/issues/184
