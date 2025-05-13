import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  submitButtonText,
  onSubmit,
  defaultValues,
}) => {
  // console.log(defaultValues);

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    // console.log(enteredValue);
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const toSubmitData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid =
      !isNaN(toSubmitData.amount) && toSubmitData.amount > 0;
    const isDateValid =
      /^\d{4}-\d{2}-\d{2}$/.test(inputs.date.value) &&
      toSubmitData.date.toString() !== 'Invalid Date';
    console.log(toSubmitData.date.toString());

    const isDescriptionValid = toSubmitData.description.trim().length !== 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert('Invalid Input', 'Please check the entered values.');
      setInputs((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: isAmountValid },
          date: { value: prevState.date.value, isValid: isDateValid },
          description: {
            value: prevState.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }
    onSubmit(toSubmitData);
  };
  //   console.log(inputProperty);

  const formisValid =
    inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View>
      <View style={styles.topInputContainer}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          invalid={!inputs.amount.isValid}
          inputConfig={{
            keyboardType: 'decimal-pad',
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, 'amount'),
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          invalid={!inputs.date.isValid}
          inputConfig={{
            keyboardType: 'decimal-pad',
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
            value: inputs.date.value,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label={'Description'}
        invalid={!inputs.description.isValid}
        inputConfig={{
          multiline: true,
          autoCorrect: false,
          textAlignVertical: 'top',
          placeholder: 'Description',
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {!formisValid && (
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.errText}>
            Invalid input values. Please check the entered values.
          </Text>
        </View>
      )}
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
  errText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
  },
});
