import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({
  onCancel,
  submitButtonText,
  onSubmit,
  defaultValues,
}) => {
  const [inputProperty, setInputProperty] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputProperty((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const toSubmitData = {
      amount: +inputProperty.amount,
      date: new Date(inputProperty.date),
      description: inputProperty.description,
    };

    const isAmountValid =
      !isNaN(toSubmitData.amount) || toSubmitData.amount > 0;
    const isDateValid = toSubmitData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = toSubmitData.description.trim().length !== 0;

    console.log(isAmountValid, isDateValid, isDescriptionValid);

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      Alert.alert('Invalid Input', 'Please check the entered values.');
      return;
    }
    onSubmit(toSubmitData);
  };
  //   console.log(inputProperty);
  return (
    <View>
      <View style={styles.topInputContainer}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          inputConfig={{
            keyboardType: 'decimal-pad',
            value: inputProperty.amount,
            onChangeText: inputChangeHandler.bind(this, 'amount'),
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          inputConfig={{
            keyboardType: 'decimal-pad',
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
            value: inputProperty.date,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label={'Description'}
        inputConfig={{
          multiline: true,
          autoCorrect: false,
          textAlignVertical: 'top',
          placeholder: 'Description',
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputProperty.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonText}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
