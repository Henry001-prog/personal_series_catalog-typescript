//console.disableYellowBox = true;
//export default from './src/SeriesApp';
import '@testing-library/jest-native';

// src/setupTests.js
// import { server } from './src/mocks/server';
import 'react-native-url-polyfill/auto';

// Establish API mocking before all tests.
// server.listen({ onUnhandledRequest: 'error' })
import React from "react";
import Router from "./src/Router";

export default function App() {
    return (
        <>
            <Router />
        </>
    );
};