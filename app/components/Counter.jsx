import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  incrementByAmount,
  decrement,
  reset,
} from '../features/counter/counterSlice';
import { colors } from '../global/colors';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value); // Asegurate que 'counter' esté en tu store
  const [inputToAdd, setInputToAdd] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Text style={styles.count}>{count}</Text>

        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <TextInput
          placeholder="Cantidad a aumentar"
          style={styles.input}
          value={inputToAdd}
          onChangeText={setInputToAdd}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.button}
          onPress={() => {
            const amount = parseInt(inputToAdd);
            if (!isNaN(amount)) {
              dispatch(incrementByAmount(amount));
              setInputToAdd('');
            }
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Pressable style={styles.resetButton} onPress={() => dispatch(reset())}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  resetButton: {
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    minWidth: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 100,
  },
});
