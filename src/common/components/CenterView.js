import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const CenterView = ({ direction, style, ...rest }) => (
  <View
    style={[
      styles.component,
      direction === 'row' ? styles.rowDirection : styles.columnDirection,
      style,
    ]}
    {...rest}
  />
);

CenterView.propTypes = {
  direction: PropTypes.string,
  style: PropTypes.any,
};

export default CenterView;

const styles = StyleSheet.create({
  component: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
});
