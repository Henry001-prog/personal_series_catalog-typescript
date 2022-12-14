import styled from "styled-components/native";
import { Container } from "../../components/FormRow/styles";
import { Dimensions, TextInput, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 320;
const width = Dimensions.get("window").width;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
  backgroundColor: "white", 
  flex: 1
})``;

export const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background-color: #252535;
`;

export const Div = styled.View.attrs({
  paddingHorizontal: 20,
})`
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #252535;
`;

export const Form = styled(Container)`
  align-items: center;
  background-color: transparent;
  border-radius: 9px;
  border-color: transparent;
  width: 87%;
`;

export const Input = styled(TextInput).attrs({
  elevation: 4,
})`
  padding-left: 15px;
  padding-bottom: 5px;
  border-color: transparent;
  width: ${width < 321 ? "285px" : "100%"};
  border-radius: 7px;
  background-color: #dce4f5;
  opacity: 0.7;
  align-items: center;
  color: #2b2c2e;
  font-size: 17px;
  height: 60px;
`;

export const Loading = styled.ActivityIndicator`
  padding-top: 5%;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  border-radius: 10px;
  width: 86.7%;
  background-color: #007fff;
  height: 55px;
  border: 1px solid #d0d0d0;
`;

export const CreateButton = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 10px;
  align-items: center;
  border-radius: 10px;
  width: 86.7%;
  height: 55px;
  border: 1px solid #d0d0d0;
`;

export const TextButton = styled.Text`
  font-size: 17px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: white;
`;

export const CreateTextButton = styled.Text`
  font-size: 17px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #007fff;
`;

export const ViewErrorMessage = styled.View`
  margin-top: 30px;
  padding-top: 3px;
  border-radius: 9px;
  background-color: #252535;
  height: 5%;
  width: 45%;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  align-items: center;
  color: white;
`;
