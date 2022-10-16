import React, { useEffect, useState, useRef } from "react";
import {
  Keyboard,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";
import firebase from "firebase";

// import { tryLogin, email as emailAtom, password as passwordAtom, isLoading } from "../../storeJotai/userAtom";
import { unstable_createStore, useAtom } from "jotai";

import { Div, Form, Input, Loading, Button, TextButton } from "./styles";
import { MainScreenNavigationProp } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { emailRecoil as emailRecoilState, passwordRecoil as passwordRecoilState, confirm_Password, isLoading, tryLogin } from "../../store/userRecoil";
import { useRecoilState } from "recoil";

export default function LoginPage() {
  const [email, setEmail] = useRecoilState<string>(emailRecoilState);
  const [password, setPassword] = useRecoilState<string>(passwordRecoilState);
  const [confirmPassword, setConfirmPassword] = useRecoilState<string>(confirm_Password);
  const [loading, setIsLoading] = useRecoilState<boolean>(isLoading);
  const [user, setUser] = useState<void>();
  // console.warn('Api: ', email);

  const navigation = useNavigation<MainScreenNavigationProp>();

  const input2Ref = useRef<RNTextInput & TextInputProps>(null);
  const input3Ref = useRef<RNTextInput & TextInputProps>(null);

  // useEffect(() => {
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyCsNst_gYIg6AUwqqx-YVRZepywsNL_xI0",
  //     authDomain: "series-b92be.firebaseapp.com",
  //     databaseURL: "https://series-b92be.firebaseio.com",
  //     projectId: "series-b92be",
  //     storageBucket: "series-b92be.appspot.com",
  //     messagingSenderId: "828328217426",
  //     appId: "1:828328217426:web:52c7133173d11a64a3888b",
  //     measurementId: "G-EP4S5RF9SK",
  //   };
  //   // Initialize Firebase
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   }
  // }, []);

  async function login() {
    const data = await tryLogin(email, password, confirmPassword, navigation, setIsLoading);
    setUser(data);
    // console.warn('Res: ', data);
    // await tryLogin(email, password, navigation, setIsLoading)
  }

  function renderButton() {
    if (loading) return <Loading size="large" color="light-blue" />;
    return (
      <Button
        onPress={() => {
          login();
          Keyboard.dismiss();
        }}
      >
        <TextButton>Entrar</TextButton>
      </Button>
    );
  }

  // const values = data.map((item, index) => (
  //   <Text key={index}>{item.title}</Text>
  // ));

  return (
    <Div>
      <Form first>
        <Input
          placeholder="user@email.com"
          placeholderTextColor="#808080"
          value={email}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(value) => setEmail(value)}
          onSubmitEditing={() => input2Ref.current!.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Form>
      <Form last>
        <Input
          placeholder="******"
          placeholderTextColor="#808080"
          returnKeyType="next"
          blurOnSubmit={false}
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
          ref={input2Ref}
          onSubmitEditing={() => input3Ref.current!.focus()}
        />
      </Form>
      <Form last>
        <Input
          placeholder="******"
          placeholderTextColor="#808080"
          returnKeyType="next"
          blurOnSubmit={false}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          ref={input3Ref}
          onSubmitEditing={async() => {
            await login();
            Keyboard.dismiss();
          }}
        />
        </Form>

      {renderButton()}
    </Div>
  );
}
