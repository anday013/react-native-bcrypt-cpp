import { Button, StyleSheet, View } from 'react-native';
import {
  generateHash,
  generateHashSync,
  validatePassword,
  validatePasswordSync,
} from 'react-native-bcrypt-cpp';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Generate Hash"
        onPress={async () => {
          const password = 'password';
          const workload = 10;
          const hash = await generateHash(password, workload);
          console.log(hash);
        }}
      />
      <Button
        title="Generate Hash Sync"
        onPress={() => console.log(generateHashSync('password', 10))}
      />

      <Button
        title="Validate Password"
        onPress={async () => {
          const password = 'password';
          const hash =
            '$2a$10$5e1Q8Bj1JWz5J9zQ7H5v3OjL2wz1I0Q9zZ6QzZ1Z1Z1Z1Z1Z1Z1Z1';
          const isValid = await validatePassword(password, hash);
          console.log(isValid);
        }}
      />

      <Button
        title="Validate Password Sync"
        onPress={() =>
          console.log(
            validatePasswordSync(
              'password',
              '$2a$10$5e1Q8Bj1JWz5J9zQ7H5v3OjL2wz1I0Q9zZ6QzZ1Z1Z1Z1Z1Z1Z1'
            )
          )
        }
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
