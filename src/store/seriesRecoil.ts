import { Alert } from "react-native";
import { atomFamily, selector, selectorFamily } from "recoil";

import { seriesApi } from "../services/api";

import { SeriesType, MySeries } from "../interfaces/seriesType";
import { MainScreenNavigationProp } from "../types/navigation";
import { RecoilState } from "recoil";
import { ISeries } from "../pages/SeriesPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, PrimitiveAtom } from "jotai";

const { api, oapi } = seriesApi;

export const listSeries = async (
  uid: string,
  token: string
): Promise<SeriesType[] | ISeries[] | undefined> => {
  try {
    const response = await api.get(`/series/${uid}`, {
      params: {
        token: token,
      },
    });
    const series: SeriesType[] = response.data;
    const userId = series.map((item, index) => item._id);
    await AsyncStorage.setItem("id", JSON.stringify(userId));

    return series;
  } catch (error: any) {
    Alert.alert("Erro ao listar as séries, tente novamente mais tarde");
  }
};

// @ts-ignore
export const seriesState: SeriesType[] | undefined = atom([]);

export const deleteSerie = (
  serie: SeriesType,
  navigation: MainScreenNavigationProp,
  token: string,
  myId: string
) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Deletar",
      `Deseja deletar série ${serie.title}?`,
      [
        {
          text: "Não",
          onPress: () => {
            resolve(false);
          },
          style: "cancel", // IOS
        },
        {
          text: "Sim",
          onPress: async () => {
            // const { currentUser } = firebase.auth();
            try {
              await api.delete(`/series/${myId}`, {
                params: {
                  token: token,
                },
              });
              resolve(true);
              navigation.goBack();
            } catch (e) {
              Alert.alert("Erro ao deletar série, tente novamente mais tarde");
            }
          },
        },
      ],
      { cancelable: false }
    );
  });
};
