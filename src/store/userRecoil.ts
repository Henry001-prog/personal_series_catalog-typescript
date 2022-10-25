import firebase from "firebase";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  LoginScreenNavigationProp,
  MainScreenNavigationProp,
} from "../types/navigation";
import {
  atom,
  RecoilState,
  selector,
} from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { seriesApi } from "../services/api";
export interface ILogin {
  email: string;
  password: string;
  token: string;
  navigation: MainScreenNavigationProp;
  setIsLoading: (value: boolean) => void;
}

const { oapi } = seriesApi;

export const emailRecoil: RecoilState<string> = atom({
  key: "email",
  default: "",
});

export const passwordRecoil: RecoilState<string> = atom({
  key: "password",
  default: "",
});
export const confirm_Password: RecoilState<string> = atom({
  key: "confirm_password",
  default: "",
});

export const isLoading: RecoilState<boolean> = atom({
  key: "loading",
  default: false,
});

export const userApi = atom({
  key: "user",
  default: `/verify/${emailRecoil}`,
});

export const myUserState = atom({
  key: "myuser",
  default: {
    uid: "",
    email: "",
    token: "",
  },
});

export const userState = selector({
  key: "loader",
  get: async ({ get }) => {
    try {
      const verifyUser = await oapi.get(`/verify/${emailRecoil}`);
      const url = get(userApi);
      const result = await oapi.get(url);

      const user = result.data;
      return user;
    } catch (error) {
      console.log("Deu erro");
    }
  },
});

export const tryLogin = async (
  email: string,
  password: string,
  confirm_password: string,
  navigation: MainScreenNavigationProp,
  createValidate: boolean,
  setIsLoading: (value: boolean) => void,
): Promise<void> => {
  
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
  if (!createValidate) {
    try {
      setIsLoading(true);
      const user = await oapi.post("/login", { email, password });
      const verifyUser = await oapi.get(`/verify/${email}`);
      // const user = await firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password);
  
      if (user) {
        const data = user.data;
        const myUid = verifyUser.data;
        const newData = { ...data, uid: myUid.uid };
        await AsyncStorage.setItem("token", JSON.stringify(newData));
  
        // const { email, token } = data;
        navigation.replace("Main", {
          user: newData,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert("Erro ao fazer o login, tente novamente mais tarde");
      setIsLoading(false);
    }
  } else {
    try {
      async function createNewUser() {
        // const result = await oapi.get(`/verify/${email}`);
        // const user = result.data;
        const createUser = await oapi.post("/signup", {
          // name: user.name,
          email,
          password,
          confirm_password,
        });
        return createUser;
      }
  
      if (createNewUser) {
        return new Promise<void>((resolve: any, reject) => {
          Alert.alert(
            "Criar novo usuário",
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
                  try {
                    setIsLoading(true);
                    const user = await createNewUser();
                    console.warn('user: ', user)
                    // const user = await oapi.post("/login", { email, password });
                    const verifyUser = await oapi.get(`/verify/${email}`);
    
                    const data = user.data;
                    const myUid = verifyUser.data;
                    const newData = { ...data, uid: myUid.uid };
                    await AsyncStorage.setItem("token", JSON.stringify(newData));
                    // const createUser = await oapi.get(`/verify/${email}`);
    
                    // const data = createUser.data;
                    // console.warn("res: ", data);
                    navigation.replace("Main", {
                      user: newData,
                    });
                  } catch (error) {
                    Alert.alert("Erro ao criar o usuário, tente novamente mais tarde");
                    setIsLoading(false);
                  }
                },
              },
            ],
            { cancelable: false }
          );
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Erro ao criar o usuário, tente novamente mais tarde");
    }
  }





  // try {
  //   const user = await oapi.post("/login", { email, password });
  //   const verifyUser = await oapi.get(`/verify/${email}`);
  //   // const user = await firebase
  //   //   .auth()
  //   //   .signInWithEmailAndPassword(email, password);
  //   setIsLoading(true);

  //   if (user) {
  //     const data = user.data;
  //     const myUid = verifyUser.data;
  //     const newData = { ...data, uid: myUid.uid };
  //     await AsyncStorage.setItem("token", JSON.stringify(newData));

  //     // const { email, token } = data;
  //     navigation.replace("Main", {
  //       user: newData,
  //     });
  //     return setIsLoading(false);
  //   }
  //   setIsLoading(false);
  // } catch (error: any) {
  //   // getMessageByErrorCode(error.code);
  //   console.warn("O erro: ", error.message);

  //   async function createNewUser() {
  //     // const result = await oapi.get(`/verify/${email}`);
  //     // const user = result.data;
  //     const createUser = await oapi.post("/signup", {
  //       // name: user.name,
  //       email,
  //       password,
  //       confirm_password,
  //     });
  //     return createUser;
  //   }
  //   setIsLoading(false);

  //   if (error.message === "Request failed with status code 401") {
  //     return new Promise<void>((resolve: any, reject) => {
  //       Alert.alert(
  //         "Usuário não encontrado",
  //         "Deseja criar um cadastro com as informações inseridas?",
  //         [
  //           {
  //             text: "Não",
  //             onPress: () => {
  //               resolve();
  //               setIsLoading(false);
  //             },
  //             style: "cancel", // IOS
  //           },
  //           {
  //             text: "Sim",
  //             onPress: async () => {
  //               const user = await createNewUser();
  //               console.warn('user: ', user)
  //               // const user = await oapi.post("/login", { email, password });
  //               const verifyUser = await oapi.get(`/verify/${email}`);

  //               const data = user.data;
  //               const myUid = verifyUser.data;
  //               const newData = { ...data, uid: myUid.uid };
  //               await AsyncStorage.setItem("token", JSON.stringify(newData));
  //               // const createUser = await oapi.get(`/verify/${email}`);

  //               // const data = createUser.data;
  //               // console.warn("res: ", data);
  //               setIsLoading(false);
  //               navigation.replace("Main", {
  //                 user: newData,
  //               });
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     });
  //   }
  //   return await Promise.reject(error);
  // }
};

export const myUser = async (email: string, password: string) => {};

// export const myUser = atom(tryLogin);

export const logout = async (
  navigation: LoginScreenNavigationProp
): Promise<void> => {
  // const tryLogout = firebase.auth().signOut();
  navigation.replace("Login");
};
