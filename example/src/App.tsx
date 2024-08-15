import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { generateHash, validatePassword } from 'react-native-bcrypt-cpp';
import { MovingRectangle } from './MovingRectangle';
import {
  genSaltSync,
  hashSync as generateHashJS,
  compareSync as validatePasswordJS,
} from './bcryptjs';

const workload = 12;
const password = 'asdcds-sdjakl12313841skdnanczdeioaj';

export default function App() {
  const [hash, setHash] = useState<string>(
    '$2a$12$a7aUL27hsWw0x2V8pJfK4eUNeANOCtAEOxJA6V4N3FIOfgoZuJz2W'
  );
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const measureTime = useCallback(async function <T>(fn: () => T): Promise<T> {
    setLoading(true);
    const start = performance.now();
    const res = await fn();
    const end = performance.now();
    const _timeTaken = end - start;
    console.log('Time taken :', _timeTaken, 'ms');
    setTimeTaken(_timeTaken);
    setLoading(false);
    return res;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Bcrypt Performance Test</Text>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Password:</Text>
          <Text style={styles.hashText}>{password}</Text>
          <Text style={styles.resultText}>Generated Hash:</Text>
          <Text style={styles.hashText}>{hash}</Text>
          <Text style={styles.resultText}>Time taken:</Text>
          <Text style={styles.timeText}>
            {Math.round((timeTaken / 1000) * 100) / 100} s
          </Text>
          <Text style={styles.resultText}>Is Valid:</Text>
          <Text style={styles.validText}>
            {isValid === undefined
              ? 'Not checked'
              : isValid
                ? '✅ Yes'
                : '❌ No'}
          </Text>
        </View>
      </View>

      <MovingRectangle />

      {loading && (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>JavaScript</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const generatedHash = await measureTime(() =>
                generateHashJS(password, genSaltSync(workload))
              );
              console.log('Generated hash JS:', generatedHash);
              setHash(generatedHash);
            }}
          >
            <Text style={styles.buttonText}>Generate Hash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const _isValid = await measureTime(() =>
                validatePasswordJS(password, hash)
              );
              console.log('is Valid JS:', _isValid);
              setIsValid(_isValid);
            }}
          >
            <Text style={styles.buttonText}>Validate Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>C++</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const generatedHash = await measureTime(() =>
                generateHash(password, workload)
              );
              console.log('Generated hash:', generatedHash);
              setHash(generatedHash);
            }}
          >
            <Text style={styles.buttonText}>Generate Hash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const _isValid = await measureTime(() =>
                validatePassword(password, hash)
              );
              console.log('isValid', _isValid);
              setIsValid(_isValid);
            }}
          >
            <Text style={styles.buttonText}>Validate Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  resultContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    color: '#555',
  },
  hashText: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: '500',
    marginVertical: 5,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6200ee',
    marginVertical: 5,
  },
  validText: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  columnHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#6200ee',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#6200ee',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
});
