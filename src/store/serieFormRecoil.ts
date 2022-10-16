import firebase from "firebase/app";
import "@firebase/database";
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  selectorFamily,
} from "recoil";
import { atomWithReducer } from "jotai/utils";
import { seriesApi } from "../services/api";
import { userState } from "./userRecoil";

import { SeriesType, IAction, MySeries } from "../interfaces/seriesType";

// const INITIAL_STATE: any = {
//   title: "",
//   img64: '',
//   gender: "Policial",
//   rate: 0,
//   description: "",
// };

// export const formReducer = (state = INITIAL_STATE, action: IAction) => {
//   // if (action.type === "setWholeSerieJotai") {
//   //   return action.serieToEdit;
//   // } else if (action.type === "setResetFormAtom") {
//   //   return INITIAL_STATE;
//   // } else {
//     const newState = { ...state };
//     newState[action.field!] = action.value;
//     console.log(newState);
//     return newState;
//   // }
// };

export const isLoading = atom({
  key: "loadingKey",
  default: false,
});

export const userId = atom({
  key: "userid",
  default: '',
});

export const serieIndex = atom({
  key: "index",
  default: 0,
});

// export const formState = selector({
//   key: "loader",
//   get: async ({ get }) => {
//     const newState = { ...state };
//     newState[action.field!] = action.value;
//     console.log(newState);
//     return newState;
//   },
// });

export const setFieldAtom = atom<SeriesType>({
  key: 'form',
  default: {
    title: '',
    gender: "Policial",
    rate: 0,
    // img64: '',
    description: "",
  },
});
// console.log('teste: ', setFieldAtom);

export const saveSerie = async (
  serie: SeriesType,
  email: string,
  token: string,
  uid: string | number[],
  myId: number
) => {
  try {
    const { api, oapi } = seriesApi;
    console.warn('save: ', serie);
    async function results() {
      // const user = {
      //   "email": "henry@mail.com",
      //   "password": "$Al123123"
      // }
      //     const uid = await oapi.post("/login", {user});
      //     console.warn('user: ', uid);
      //   const result = await oapi.get(`/verify/${email}`);
      //   const user = result.data;
      //   const test = {
      //     uid: user.email,
      //     series: serie,
      //   };
      //   console.warn("Série: ", test);
      //   const { token } = user;
    }
    results();
    if (serie._id) {
      console.warn('save2: ', serie);
      await api.put(
        `/series/${myId}`,
        { series: serie },
        {
          params: {
            token: token,
          },
        }
      );
      //   await db.ref(`/users/${currentUser!.uid}/series/${serie.id}`).set(serie);
    } else {
      console.warn('save3: ', serie);
      await api.post(
        '/series',
        { uid: uid, series: serie },
        {
          params: {
            token: token,
          },
        }
      );
      //   await db.ref(`/users/${currentUser!.uid}/series`).push(serie);
    }
  } catch (e) {
    console.log("deu algum erro!");
  }
};
