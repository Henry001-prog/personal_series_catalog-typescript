import { selector } from "recoil";
import { seriesApi } from "../services/api";

import { SeriesType } from "../interfaces/seriesType";
import { Alert } from "react-native";
import { atom, PrimitiveAtom } from "jotai";

const { api } = seriesApi;

export const isLoading: PrimitiveAtom<boolean> = atom(false);

export const userId = atom("");

export const serieIndex = atom(0);

export const postImageState = atom("");

export const getImageState = atom("");

export const setFieldAtom = atom<SeriesType>({
    title: "",
    img: "",
    gender: "Policial",
    rate: 0,
    description: "",
  },
);

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
