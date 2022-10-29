import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import SeriesPage from "../../pages/SeriesPage";
import { RecoilRoot } from "recoil";
import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { getByTestId } from "@testing-library/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// jest.mock("@react-native-async-storage/async-storage", () => AsyncStorageMock);
const mockedDispatch = jest.fn();
// jest.mock("../../store/userRecoil");

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
    useRoute: jest.fn(),
    useIsFocused: jest.fn(),
  };
});

// JSON.parse = jest.fn().mockImplementationOnce(() => {
//   // return your what your code is returning.
// });
let mockItems = [
  {
    uid: jest.fn(),
    token: jest.fn(),
  },
];
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   setItem: jest.fn((item, value) => {
//     return new Promise((resolve) => {
//       mockItems[item] = value;

//       setTimeout(() => resolve(value), 100);
//     });
//   }),
//   getItem: jest.fn((item) => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(mockItems[item]), 100);
//     });
//   }),
// }));

const newData = {
  uid: jest.mock,
  token: jest.mock,
}

const asyncOperationOnAsyncStorage = async () => { 
  await AsyncStorage.setItem('token', JSON.stringify(newData))
}

describe("SeriesPage screen", () => {
  // it("checks if Async Storage is used", async () => {
  //   // await asyncOperationOnAsyncStorage();

  //   // expect(AsyncStorage.setItem).toBeCalledWith("token", JSON.stringify(newData));
  // });

  it("should be able to render a components in SeriesPage", async () => {
    asyncOperationOnAsyncStorage();
    
    const { findByText, debug } = render(
      <RecoilRoot>
        <SeriesPage />
      </RecoilRoot>
    );
    const fallback_text = await screen.findAllByText("Teste!!!");
    debug();
    expect(fallback_text).toHaveLength(1);
  });


});
