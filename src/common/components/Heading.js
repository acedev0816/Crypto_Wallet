import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const Heading = ({ children, notFirst, ...rest }) => (
  <Text style={[styles.heading, notFirst ? styles.notFirst : undefined]} {...rest}>
    {children}
  </Text>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  notFirst: PropTypes.bool,
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    marginBottom: 10,
  },
  notFirst: {
    marginTop: 20,
  },
});
