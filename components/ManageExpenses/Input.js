import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, inputConfig, style }) => {
  const { multiline } = inputConfig;
  const inputStyles = [styles.input];
  multiline && inputStyles.push(styles.multiline);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...inputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    padding: 6,
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
    marginVertical: 4,
  },
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
    // flex: 1,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
    marginBottom: 4,
  },
  multiline: {
    minHeight: 100,
  },
});
