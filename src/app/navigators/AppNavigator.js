import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import CustomDrawer from './drawer/CustomDrawer';
import {
  CreateWalletContainer,
  SelectActiveWalletContainer,
  SendTransactionContainer,
  GenerateAddressContainer,
  WalletHistoryContainer,
  ExportWalletContainer,
  ImportWalletContainer,
} from '../../features/wallet/containers';

const AppNavigator = DrawerNavigator(
  {
    SelectActiveWallet: {
      screen: SelectActiveWalletContainer,
    },
    CreateWallet: {
      screen: CreateWalletContainer,
    },
    SendTransaction: {
      screen: SendTransactionContainer,
    },
    GenerateAddress: {
      screen: GenerateAddressContainer,
    },
    WalletHistory: {
      screen: WalletHistoryContainer,
    },
    ExportWallet: {
      screen: ExportWalletContainer,
    },
    ImportWallet: {
      screen: ImportWalletContainer,
    },
  },
  {
    initialRouteName: 'SelectActiveWallet',
    contentComponent: CustomDrawer,
    // https://github.com/react-navigation/react-navigation/issues/3149#issuecomment-352862563
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    headerMode: 'none',
    drawerWidth: 300,
    drawerPosition: 'left',
  }
);

export default AppNavigator;
