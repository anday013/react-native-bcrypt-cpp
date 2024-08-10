# react-native-bcrypt-cpp

Next-gen React Native library for Bcrypt hashing using pure C++ with Turbo Modules and multithreading for superior performance.

**_NOTE:_** This library can be used only with New Architecture (more information about New Architecture [here](https://github.com/reactwg/react-native-new-architecture))

## Installation

```sh
npm install react-native-bcrypt-cpp
```

or

```sh
yarn add react-native-bcrypt-cpp
```

## Usage

### Asynchronous Hashing (Multithreaded)

```js
import { generateHash, validatePassword } from 'react-native-bcrypt-cpp';

// Generate a hash asynchronously
const hash = await generateHash('password', 12);

// Validate a password against a hash
const isValid = await validatePassword('password', hash);
```

### Synchronous Hashing (Single-threaded)

```js
import {
  generateHashSync,
  validatePasswordSync,
} from 'react-native-bcrypt-cpp';

// Generate a hash synchronously
const hash = generateHashSync('password', 12);

// Validate a password against a hash synchronously
const isValid = validatePasswordSync('password', hash);
```

## API Reference

## API Reference

### `generateHash(password: string, workload: number): Promise<string>`

Asynchronously generates a Bcrypt hash for the given password with the specified workload factor.

**Parameters:**

- `password` (string): The password to hash.
- `workload` (number): The cost factor for the hashing algorithm (e.g., 12).

**Returns:**

- A `Promise` that resolves to a `string` containing the generated hash.

### `validatePassword(password: string, hash: string): Promise<boolean>`

Asynchronously validates the given password against the Bcrypt hash.

**Parameters:**

- `password` (string): The password to validate.
- `hash` (string): The Bcrypt hash to validate against.

**Returns:**

- A `Promise` that resolves to a `boolean` indicating whether the password is valid.

### `generateHashSync(password: string, workload: number): string`

Synchronously generates a Bcrypt hash for the given password with the specified workload factor.

**Parameters:**

- `password` (string): The password to hash.
- `workload` (number): The cost factor for the hashing algorithm (e.g., 12).

**Returns:**

- A `string` containing the generated hash.

### `validatePasswordSync(password: string, hash: string): boolean`

Synchronously validates the given password against the Bcrypt hash.

**Parameters:**

- `password` (string): The password to validate.
- `hash` (string): The Bcrypt hash to validate against.

**Returns:**

- A `boolean` indicating whether the password is valid.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
