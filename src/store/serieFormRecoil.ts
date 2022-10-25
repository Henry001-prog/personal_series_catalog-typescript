import { atom, selector } from "recoil";
import { seriesApi } from "../services/api";

import { SeriesType } from "../interfaces/seriesType";
import { Alert } from "react-native";

const { api } = seriesApi;

export const isLoading = atom({
  key: "loadingKey",
  default: false,
});

export const userId = atom({
  key: "userid",
  default: "",
});

export const serieIndex = atom({
  key: "index",
  default: 0,
});

export const postImageState = atom({
  key: "postimagestate",
  default: "",
});

export const getImageState = atom({
  key: "getimagestate",
  default: "",
});

export const postImage = selector({
  key: "loaderForm",
  get: async ({ get }) => {
    try {
      const url = get(postImageState);
      const result = await api.post(url);

      const resultImage = result.data;
      return resultImage;
    } catch (error) {
    }
  },
});

export const setFieldAtom = atom<SeriesType>({
  key: "form",
  default: {
    title: "",
    img: "",
    gender: "Policial",
    rate: 0,
    description: "",
  },
});

export const saveSerie = async (
  serie: SeriesType,
  email: string,
  token: string,
  uid: string | number[],
  myId: number
) => {
  try {
    const { api, oapi } = seriesApi;
    if (serie._id) {
      await api.put(
        `/series/${myId}`,
        { series: serie },
        {
          params: {
            token: token,
          },
        }
      );
    } else {
      await api.post(
        "/series",
        { uid: uid, series: serie },
        {
          params: {
            token: token,
          },
        }
      );
    }
  } catch (e) {
    Alert.alert("Erro ao criar a nova série, tente novamente mais tarde");
  }
};
