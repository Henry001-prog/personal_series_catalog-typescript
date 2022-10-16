import firebase from "firebase";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  LoginScreenNavigationProp,
  MainScreenNavigationProp,
} from "../types/navigation";
import { atom } from "jotai";

import { seriesApi } from "../services/api";

export const isLoading = atom<boolean>(false);
export interface ILogin {
  email: string;
  password: string;
  navigation: MainScreenNavigationProp;
  setIsLoading: (value: boolean) => void;
}

const { oapi } = seriesApi;

export const email = atom<string>('');
export const password = atom<string>('');

// console.warn('Console email: ', email);
// console.warn('Console password: ', password);

// export const loginUser = async () => {
//   const result = await oapi.post("/login", { email, password });
//   const user = result.data;
//   return user;
// }

// const test = loginUser();
// console.warn('Console test: ', test);

export const tryLogin = async (
  email: string,
  password: string,
  navigation: MainScreenNavigationProp,
  setIsLoading: (value: boolean) => void
): Promise<void> => {
  setIsLoading(true);
  // function getMessageByErrorCode(errorCode: any) {
  //   switch (errorCode) {
  //     case "auth/wrong-password":
  //       setIsLoading(false);
  //       return "Senha incorreta";
  //     case "auth/user-not-found":
  //       setIsLoading(false);
  //       return "Usuário não encontrado";
  //     default:
  //       setIsLoading(false);
  //       return "Erro desconhecido";
  //   }
  // }
  try {
    const user = await oapi.post("/login", { email, password });
    // const user = await firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password);
    setIsLoading(true);
    if (user) {
      const data = user.data;
      // const { email, token } = data;
      navigation.replace("Main", {
        user: data,
      });
      return setIsLoading(false);
    }
    setIsLoading(false);
  } catch (error: any) {
    // getMessageByErrorCode(error.code);
    console.warn("O erro: ", error.message);

    async function createNewUser() {
      const createUser = await oapi.post("/signup", {
        name: "Radamantis",
        email,
        password,
        confirm_password: "$Al123123",
      });
    }

    if (error.message === "Request failed with status code 404") {
      return new Promise<void>((resolve: any, reject) => {
        Alert.alert(
          "Usuário não encontrado",
          "Deseja criar um cadastro com as informações inseridas?",
          [
            {
              text: "Não",
              onPress: () => {
                resolve();
                setIsLoading(false);
              },
              style: "cancel", // IOS
            },
            {
              text: "Sim",
              onPress: async () => {
                await createNewUser();
                const createUser = await oapi.get(`/verify/${email}`);

                const data = createUser.data;
                // console.warn("res: ", data);
                if (data.email) {
                  navigation.replace("Main", {
                    user: data,
                  });
                }
              },
            },
          ],
          { cancelable: false }
        );
      });
    }
    return await Promise.reject(error);
  }
};

export const myUser = async (email: string, password: string) => {};

// export const myUser = atom(tryLogin);

export const logout = async (
  navigation: LoginScreenNavigationProp
): Promise<void> => {
  try {
    const tryLogout = firebase.auth().signOut();
    navigation.replace("Login");
  } catch (error) {
    Alert.alert("Não foi possível carregar os dados!");
    return;
  }
};
