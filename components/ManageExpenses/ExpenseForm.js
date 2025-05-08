import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';

const ExpenseForm = () => {
  const [inputProperty, setInputProperty] = useState({
    amount: '',
    date: '',
    description: '',
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputProperty((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  return (
    <View>
      <View style={styles.topInputContainer}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          inputConfig={{
            keyboardType: 'decimal-pad',
          }}
          onChangeText={inputChangeHandler.bind(this, 'amount')}
          value={inputProperty.amount}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          inputConfig={{
            keyboardType: 'decimal-pad',
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
          }}
          onChangeText={inputChangeHandler.bind(this, 'date')}
          value={inputProperty.date}
        />
      </View>
      <Input
        label={'Description'}
        inputConfig={{
          multiline: true,
          autoCorrect: false,
          textAlignVertical: 'top',
          placeholder: 'Description',
        }}
        onChangeText={inputChangeHandler.bind(this, 'description')}
        value={inputProperty.description}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  topInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
});
