//console.disableYellowBox = true;
//export default from './src/SeriesApp';
import '@testing-library/jest-native';

// src/setupTests.js
import { server } from './src/mocks/server';
import 'react-native-url-polyfill/auto';

// Establish API mocking before all tests.
server.listen({ onUnhandledRequest: 'error' })
export { default } from './src/SeriesApp';