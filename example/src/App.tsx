import { Button, StyleSheet, View } from 'react-native';
import {
  generateHash,
  generateHashSync,
  validatePassword,
  validatePasswordSync,
} from 'react-native-bcrypt-cpp';
import { MovingRectangle } from './MovingRectangle';

const workload = 15;
const password = 'asdcds-sdjakl12313841skdnanczdeioaj';
const hash = '$2b$15$wX0mKtpwGwzdfbz099nUnu5R.NN/huUK9XBra0sS4xj4XfjfPOkzO';

async function measureTime<T>(fn: () => T): Promise<T> {
  const start = performance.now();
  const res = await fn();
  const end = performance.now();
  const timeTaken = end - start;
  console.log('Time taken :', timeTaken, 'ms');
  return res;
}

export default function App() {
  return (
    <View style={styles.container}>
      <MovingRectangle />
      <Button
        title="Generate Hash"
        onPress={async () => {
          const generatedHash = await measureTime(() =>
            generateHash(password, workload)
          );
          console.log('Generated hash:', generatedHash);
        }}
      />
      <Button
        title="Validate Password"
        onPress={async () => {
          const isValid = await measureTime(() =>
            validatePassword(password, hash)
          );
          console.log('isValid', isValid);
        }}
      />
      <Button
        title="Generate Hash Sync"
        onPress={async () => {
          const generatedHash = await measureTime(() =>
            generateHashSync(password, workload)
          );
          console.log('Generated hash:', generatedHash);
        }}
      />

      <Button
        title="Validate Password Sync"
        onPress={async () => {
          const isValid = await measureTime(() =>
            validatePasswordSync(password, hash)
          );
          console.log('isValid', isValid);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
