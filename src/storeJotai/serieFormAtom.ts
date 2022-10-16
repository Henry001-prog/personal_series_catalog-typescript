// import firebase from "firebase/app";
// import "@firebase/database";
// import { atom } from "jotai";
// import { atomWithReducer } from "jotai/utils";
// import { seriesApi } from "../services/api";

// import { loginUser } from '../storeJotai/userAtom';

// import { SeriesType, IAction, MySeries } from "../interfaces/seriesType";

// const INITIAL_STATE: any = {
//   title: "",
//   gender: "Policial",
//   rate: 0,
//   description: "",
// };

// const formReducer = (state = INITIAL_STATE, action: IAction) => {
//   if (action.type === "setWholeSerieJotai") {
//     return action.serieToEdit;
//   } else if (action.type === "setResetFormAtom") {
    
//     return INITIAL_STATE;
//   } else {
//     const newState = { ...state };
//     newState[action.field!] = action.value;
//     console.log(newState)
//     return newState;
//   }
// };

// export const isLoading = atom(false);
// export const setFieldAtom = atomWithReducer([], formReducer);
// // console.log('teste: ', setFieldAtom);

// export const saveSerie = async (serie: MySeries) => {
//   try {
//     const { api, oapi } = seriesApi;
//     async function results() {
//       // const user = {
//       //   "email": "henry@mail.com",
//       //   "password": "$Al123123"
//       // }
//       //     const uid = await oapi.post("/login", {user});
//       //     console.warn('user: ', uid);
//       const email = loginUser();
//       const result = await oapi.get(`/verify/${"henry@mail.com"}`);
//       const user = result.data;

//       const test = {
//         uid: user.email,
//         series: serie,
//       };
//       console.warn("Série: ", test);

//       await api.post("/series", test, {
//         params: {
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlNjRjOWVmYzBjZmExMmE5ZDY2ODAiLCJuYW1lIjoiSGVucnkiLCJlbWFpbCI6ImhlbnJ5QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUi9MdUUzTk53a3dRcGIwZ25kWGRaZWVHMVBXcEhZU0tCdEpEQUJHa2hoWk5DWXZsS1VUV3kiLCJfX3YiOjAsImlhdCI6MTY2NTI4MTg4OSwiZXhwIjoxNjY1MzY4Mjg5fQ.FW372FdpC_JUmZvWii1iWBH11VTC7SsMUtRYOVDSL_Q",
//         },
//       });
//     }
//     results();
//     // if (serie.id) {
//     //   await db.ref(`/users/${currentUser!.uid}/series/${serie.id}`).set(serie);
//     // } else {
//     //   await db.ref(`/users/${currentUser!.uid}/series`).push(serie);
//     // }
//   } catch (e) {
//     console.log("deu algum erro aqui no firebase");
//   }
// };
