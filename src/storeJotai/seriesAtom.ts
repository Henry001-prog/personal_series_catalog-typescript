import firebase from "firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import { atom } from "jotai";

import { seriesApi } from "../services/api";

import { SeriesType, MySeries } from "../interfaces/seriesType";
import { MainScreenNavigationProp } from "../types/navigation";

const { api, oapi } = seriesApi;

export const watchSeriesJotaiAtom = async (
  email: string,
  token: string
): Promise<MySeries[] | undefined> => {
  try {
    // const result = await oapi.get(`/verify/${email}`);
    // const user = result.data;
    // const email = user.email;
    // const token = user.token;
    // console.warn("user: ", user.email);
    const response = await api.get(`/series/${email}`, {
      params: {
        token: token,
      },
    });
    const series = response.data;
    // console.warn("resposta: ", series);
    // setSeries(series);
    // setLoading(false);

    // const { currentUser } = await firebase.auth();

    // const base = firebase.database().ref(`/users/${currentUser!.uid}/series`);
    // const snapshot = await base.once("value");
    // const series = snapshot.val();

    // const keys = Object.keys(series);
    // const seriesWithKeys: MySeries[] = keys.map((id) => {
    //   return { ...series[id], id };
    // });

    const isLast = { isLast: true } as SeriesType;
    return series;
  } catch (error: any) {
    if (!error.message.includes("null is not an object")) {
      Alert.alert("Error: could not login!");
    }
  }
};

export const watchSeriesJotai = atom<MySeries[] | undefined | {}>([]);
export const isLoading = atom<boolean>(false);

// const navigation = useNavigation<MainScreenNavigationProp>();

export const deleteSerie = (
  serie: MySeries,
  navigation: MainScreenNavigationProp
) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Deletar",
      `Deseja deletar série ${serie.series.title}?`,
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
            const { currentUser } = firebase.auth();
            try {
              await firebase
                .database()
                .ref(`/users/${currentUser!.uid}/series/${serie.series.id}`)
                .remove();
              resolve(true);
              navigation.goBack();
            } catch (e) {
              reject(e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  });
};
