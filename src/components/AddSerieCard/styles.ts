import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  SerieForm: undefined;
};

export type SerieFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SerieForm"
>;

interface FirstColumn {
  onPress: any
  isFirstColumn?: boolean
}

export const AddSeriesCard = styled.TouchableOpacity<FirstColumn>`
  width: 50%;
  padding: 5px 5px 5px 0px;
  height: ${Dimensions.get("window").width / 2}px;
  justify-content: flex-end;
`;

export const Card = styled.View`
  height: 97%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.Image`
  width: 33.8%;
  height: 35.7%;
  margin-top: 98%;
  margin-left: 4%;
`;
