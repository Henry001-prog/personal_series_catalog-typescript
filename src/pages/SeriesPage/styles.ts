import styled from "styled-components/native";
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Dimensions } from 'react-native';

interface ISize {
  sizeE: number;
};

const { width, height } = Dimensions.get('window');

export const ViewLoading = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;

export const Container = styled.View`
  height: 100%;
  background-color: #252535;
  justify-content: center;
  align-items: center;
`;

export const ViewList = (styled.FlatList`
`as unknown) as typeof FlatList;

export const ViewTop = styled.View`
  margin-top: 28%;
`;

export const ViewAdjust = styled.View<ISize>`
  right: ${(props) =>
    props.sizeE === 1 ? "15%" : "0%"};;
`;

export const ViewButtonTwo = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-top: 40%;
  width: 100px;
`;

export const ViewBottom = styled.View`
  margin-bottom: 80px;
`;

export const ViewButtonNew = styled.View`
  width: 22%;
  padding-left: 0.40%;
  border-radius: 100px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #007fff;
  border-radius: 100px;
  height: ${width > 400 ? '10.2%' : '7.45%'};
  width: ${width > 400 ? '17%' : '18%'};
  margin-left: 0.15%;
  position: absolute;
  bottom: 1.5%;

`;

export const Text = styled.Text`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
