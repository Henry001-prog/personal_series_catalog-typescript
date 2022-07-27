import firebase from "firebase";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginScreenNavigationProp, MainScreenNavigationProp } from "../types/navigation";
import { atom } from "jotai";

export const isLoading = atom<boolean>(false);
export interface ILogin {
  email: string
  password: string
  navigation: MainScreenNavigationProp
  setIsLoading: (value: boolean) => void
}

export const tryLogin = async (
  email: string,
  password: string,
  navigation: MainScreenNavigationProp,
  setIsLoading: (value: boolean) => void
): Promise<void> => {
  setIsLoading(true);
  function getMessageByErrorCode(errorCode: any) {
    switch (errorCode) {
      case "auth/wrong-password":
        setIsLoading(false);
        return "Senha incorreta";
      case "auth/user-not-found":
        setIsLoading(false);
        return "Usuário não encontrado";
      default:
        setIsLoading(false);
        return "Erro desconhecido";
    }
  }
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setIsLoading(true);
    if (user) {
      navigation.replace("Main");
      return setIsLoading(false);
    }
    setIsLoading(false);
  } catch (error: any) {
    getMessageByErrorCode(error.code);
    console.warn("O erro: ", error.code);
    if (error.code === "auth/user-not-found") {
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
              onPress: () => {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(resolve)
                  .catch(reject);
                navigation.replace("Main");
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

export const logout = async (navigation: LoginScreenNavigationProp): Promise<void> => {
  try {
    const tryLogout = firebase.auth().signOut();
    navigation.replace("Login");
  } catch (error) {
    Alert.alert("Não foi possível carregar os dados!");
    return;
  }
};
