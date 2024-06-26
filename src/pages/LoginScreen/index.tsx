import React, { useState, useRef } from "react";
import {
  Keyboard,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";

import {
  Div,
  Form,
  Input,
  Loading,
  Button,
  TextButton,
  CreateButton,
  CreateTextButton,
  ScrollView,
  KeyboardAvoidingView,
} from "./styles";
import { MainScreenNavigationProp } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import {
  emailRecoil as emailRecoilState,
  passwordRecoil as passwordRecoilState,
  confirm_Password,
  isLoading,
  tryLogin,
} from "../../store/userRecoil";
import { useAtom } from "jotai";

export default function LoginPage() {
  const [email, setEmail] = useAtom<string>(emailRecoilState);
  const [password, setPassword] = useAtom<string>(passwordRecoilState);
  const [confirmPassword, setConfirmPassword] = useAtom<string>(confirm_Password);
  const [loading, setIsLoading] = useAtom<boolean>(isLoading);
  const [createValidate, setCreateValidate] = useState<boolean>(false);
  const [user, setUser] = useState<void>();

  // const resetEmail = setEmail("");
  // const resetPassword = setPassword("");
  // const resetConfirmPassword = setConfirmPassword("");

  const navigation = useNavigation<MainScreenNavigationProp>();

  const input2Ref = useRef<RNTextInput & TextInputProps>(null);
  const input3Ref = useRef<RNTextInput & TextInputProps>(null);

  async function login() {
    const data = await tryLogin(
      email,
      password,
      confirmPassword,
      navigation,
      createValidate,
      setIsLoading
    );
    setUser(data);
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
        <TextButton>{!createValidate ? "Entrar" : "Cadastrar"}</TextButton>
      </Button>
    );
  }

  return (
    <KeyboardAvoidingView accessible={false} enabled>
      <ScrollView>
        <Div>
          <Form first>
            <Input
              placeholder="user@email.com"
              placeholderTextColor="#808080"
              value={email}
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={(value: string) => setEmail(value)}
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
              onChangeText={(value: string) => setPassword(value)}
              ref={input2Ref}
              onSubmitEditing={
                createValidate
                  ? () => input3Ref.current!.focus()
                  : async () => {
                      await login();
                      Keyboard.dismiss();
                    }
              }
            />
          </Form>

          {createValidate ? (
            <Form last>
              <Input
                placeholder="******"
                placeholderTextColor="#808080"
                returnKeyType="next"
                blurOnSubmit={false}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(value: string) => setConfirmPassword(value)}
                ref={input3Ref}
                onSubmitEditing={async () => {
                  await login();
                  Keyboard.dismiss();
                }}
              />
            </Form>
          ) : null}

          <CreateButton
            onPress={() => {
              setCreateValidate(!createValidate);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            <CreateTextButton>
              {!createValidate
                ? "Clique aqui para criar uma conta"
                : "Voltar para a tela de login"}
            </CreateTextButton>
          </CreateButton>

          {renderButton()}
        </Div>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
