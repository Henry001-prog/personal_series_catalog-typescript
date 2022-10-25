import firebase from "firebase/app";
import "@firebase/database";
import { Alert } from "react-native";
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
} from "recoil";

import { seriesApi } from "../services/api";

import { SeriesType, MySeries } from "../interfaces/seriesType";
import { MainScreenNavigationProp } from "../types/navigation";
import { RecoilState } from "recoil";
import { ISeries } from "../pages/SeriesPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { api, oapi } = seriesApi;

// export const userApi = atom({
//   key: "user",
//   default: `/verify/${myEmail}`,
// });

// const seriesState = selector({
//   key: "loader",
//   get: async ({ get }) => {
//     try {
//       const url = get(userApi);
//       const result = await oapi.get(url);

//       return result.data;
//     } catch (error) {
//       console.log("Deu erro");
//     }
//   },
// });

export const listSeries = async (
  uid: string,
  token: string
): Promise<SeriesType[] | ISeries[] | undefined> => {
  try {
    // const result = await oapi.get(`/verify/${email}`);
    // const user = result.data;
    // const email = user.email;
    // const token = user.token;
    // console.warn("user: ", user.email);
    console.warn('uid: ', uid)
    const response = await api.get(`/series/${uid}`, {
      params: {
        token: token,
      },
    });
    // console.warn('Minhas séries: ', response.data)
    const series: SeriesType[] = response.data;
    const userId = series.map((item, index) => item._id);
    // console.warn('Id do localstorage series: ', userId);
    await AsyncStorage.setItem("id", JSON.stringify(userId));
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

export const seriesState = atom<SeriesType[] | undefined>({
  key: "listSeries",
  default: [],
});

// export const watchSeriesJotai = atom<MySeries[] | undefined | {}>([]);
// export const isLoading = atom<boolean>(false);

// const navigation = useNavigation<MainScreenNavigationProp>();

export const deleteSerie = (
  serie: SeriesType,
  navigation: MainScreenNavigationProp,
  token: string,
  myId: string,
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
              console.warn('delete: ', myId);
              await api.delete(`/series/${myId}`, {
                params: {
                  token: token
                }
              });
              // await firebase
              //   .database()
              //   .ref(`/users/${currentUser!.uid}/series/${serie.series.id}`)
              //   .remove();
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
