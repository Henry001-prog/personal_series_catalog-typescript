import React, { useEffect } from "react";

import {
  ScrollView,
  ContainerRate,
  Image,
  Title,
  Gender,
  ViewButton,
  Button,
  ButtonText,
} from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MainScreenNavigationProp, SerieFormScreenNavigationProp } from "../../types/navigation";

import { deleteSerie } from "../../store/seriesRecoil";

import Line from "../../components/Line";
import LongText from "../../components/LongText";
import { isLoading, serieIndex } from "../../store/serieFormRecoil";
import { useAtom } from "jotai";
import { SeriesType } from "../../interfaces/seriesType";
import { useRecoilState, useSetRecoilState } from "recoil";
import { myUserState } from "../../store/userRecoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StackParamsList = {
  SerieDetail: {
    serie: {
      id: null;
      title: string;
      gender: string;
      rate: number;
      img: string;
      description: string;
    };
    index: number;
  };
};

// interface RouteParams extends RouteProp<ParamListBase, string> {
//   params: {
//     serie: {
//       id: null;
//       title: string;
//       gender: string;
//       rate: number;
//       img64: string;
//       description: string;
//     };
//   }
// }

export default function SerieDetailPage() {
  const [loading, setLoading] = useRecoilState<boolean>(isLoading);
  const [user, setUser] = useRecoilState(myUserState);
  const [myFilterId, setMyFilterId] = useRecoilState<number>(serieIndex);

  const { replace }  = useNavigation<SerieFormScreenNavigationProp>();
  const navigation  = useNavigation<MainScreenNavigationProp>();
  const route = useRoute<RouteProp<StackParamsList, "SerieDetail">>();

  useEffect(() => {
    async function getIndex() {
      const jsonValue = await AsyncStorage.getItem("id");
      const validateValueJson =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      const { params } = route;
      const myIndex = params.index;
      const filterId = validateValueJson.find((item: any, index: any) => index == myIndex);
      setMyFilterId(filterId != null ? filterId : 100);
    }
    getIndex();
  }, []);

  const { serie } = route.params;
  const { index } = route.params;
  return (
    <ScrollView>
      {serie.img ? (
        <Image
          source={{
            uri: `data:image/jpeg;base64,${serie.img}`,
          }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(37, 37, 53, 1)",
              "rgba(37, 37, 53, 1)",
              "transparent",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 2.4 }}
            style={{
              height: 45,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          ></LinearGradient>
        </Image>
          ) : null}
      <Title>{serie.title}</Title>

      <ContainerRate>
        <AntDesign name="star" size={24} color="#FFFF00" />
        <Line content={String(serie.rate)} />
        <Gender>{serie.gender}</Gender>
      </ContainerRate>

      <LongText label="Descrição" content={serie.description} />
      <ViewButton>
        <Button
          onPress={() => {
            replace("SerieForm", { serieToEdit: serie, index: index });
          }}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </ViewButton>
      <ViewButton>
        <Button
          style={{ backgroundColor: "#FF0004" }}
          onPress={async () => {
            setLoading(true);
            deleteSerie(serie, navigation, user.token, String(myFilterId));
          }}
        >
          <ButtonText>Deletar</ButtonText>
        </Button>
      </ViewButton>
    </ScrollView>
  );
}
