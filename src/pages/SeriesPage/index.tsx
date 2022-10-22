import React, { Suspense, useEffect, useMemo, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  ViewLoading,
  Loading,
  Container,
  ViewList,
  ViewTop,
  ViewBottom,
  ViewButton,
  Button,
  ViewButtonNew,
  Text,
} from "./styles";

import { Svg, Path } from "react-native-svg";
import { line, curveBasis } from "d3-shape";
import { FontAwesome5 } from "@expo/vector-icons";

import { Dimensions, FlatList, ListRenderItemInfo } from "react-native";

import SerieCard from "../../components/SerieCard";

import AddSerieCard from "../../components/AddSerieCard";

import { listSeries, seriesState } from "../../store/seriesRecoil";
import { isLoading } from "../../store/serieFormRecoil";
import { myUser } from "../../storeJotai/userAtom";
import { useAtom } from "jotai";

import { seriesApi } from "../../services/api";

import { StackNavigationProp } from "@react-navigation/stack";
import {
  SeriesType,
  IAction,
  Item,
  MySeries,
} from "../../interfaces/seriesType";
import {
  SerieFormScreenNavigationProp,
  SerieDetailScreenNavigationProp,
} from "../../types/navigation";
import {
  emailRecoil as emailRecoil,
  passwordRecoil as passwordRecoil,
  ILogin,
  userState,
  userApi,
  myUserState,
} from "../../store/userRecoil";

import { ParamListBase, RouteProp } from "@react-navigation/native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ParamsProps extends RouteProp<ParamListBase, string> {
  params: {
    user: ILogin;
  };
}

const { width, height } = Dimensions.get("window");

const isEven = (number: number) => number % 2 === 0;
const { api } = seriesApi;

interface IRoute {
  params: {
    user: {
      email: string;
      token: string;
    };
  };
}

export interface ISeries {
  series: {
    _id?: string | null;
    title: string;
    gender: string;
    rate: number | number[];
    img64: string;
    description: string;
    isLast?: boolean;
  };
}

export interface ItemPage {
  series: MySeries;
  item: SeriesType;
  index: number;
}

export default function SeriesPage(
  navigation: SerieFormScreenNavigationProp | SerieDetailScreenNavigationProp,
  route: IRoute
) {
  const [series, setSeries] = useRecoilState<SeriesType[] | undefined>(
    seriesState
  );
  const [email, setEmail] = useRecoilState<string>(emailRecoil);
  const [id, setId] = useState<number[]>();
  const [loading, setLoading] = useRecoilState(isLoading);
  const [myUser, setMyUser] = useRecoilState(myUserState);
  const isFocused = useIsFocused();

  const { navigate } = useNavigation<SerieFormScreenNavigationProp>();

  const routerParams = useRoute<ParamsProps>() || "";
  const userParams = routerParams.params.user || useRecoilValue(userState);

  const user = route || useRecoilValue(userState);

  const resetEmail = useResetRecoilState(emailRecoil);
  const resetPassword = useResetRecoilState(passwordRecoil);

  useEffect(() => {
    resetEmail();
    resetPassword();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("token");
        const validateValueJson =
          jsonValue != null ? JSON.parse(jsonValue) : null;
        const response: ISeries[] | SeriesType[] | undefined = await listSeries(
          validateValueJson.uid,
          validateValueJson.token
        );
        if (Object.is(response, {})) {
          setSeries([]);
        } else {
          // response?.map(item => item.series)
          const mySeries = response?.map((item: any) => item.series);
          const id = response?.map((item: any) => item._id);
          // const mySeriesWithId = { ...mySeries, id };
          setId(id);
          setSeries(response?.map((item: any) => item.series));
        }
        setMyUser(validateValueJson);
      } catch (e) {
        // error reading value
      }

      setLoading(false);
    };
    getData();
    if (isFocused) getData();
  }, [isFocused, setLoading, setSeries]);

  // useEffect(() => {
  //   setLoading(true);
  //   async function results() {
  //     const response = await api.get(`/series/${"ggkeedree3e"}`, {
  //       params: {
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlNjRjOWVmYzBjZmExMmE5ZDY2ODAiLCJuYW1lIjoiSGVucnkiLCJlbWFpbCI6ImhlbnJ5QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUi9MdUUzTk53a3dRcGIwZ25kWGRaZWVHMVBXcEhZU0tCdEpEQUJHa2hoWk5DWXZsS1VUV3kiLCJfX3YiOjAsImlhdCI6MTY2NTI4MTg4OSwiZXhwIjoxNjY1MzY4Mjg5fQ.FW372FdpC_JUmZvWii1iWBH11VTC7SsMUtRYOVDSL_Q",

  //       },
  //     });
  //     const series = response.data;
  //     // console.warn("resposta: ", series);
  //     setSeries(series);
  //     setLoading(false);
  //   }
  //   results();
  //   if (isFocused) results();
  // }, [isFocused, setLoading, setSeries]);

  const TAB_HEIGHT = 60;

  const { width } = Dimensions.get("window");

  const lineGenerator = line();

  const rect = lineGenerator([
    [0, 0],
    [width / 2, 0],
    [width, 0],
    [width, TAB_HEIGHT],
    [0, TAB_HEIGHT],
    [0, 0],
  ]);

  const center = lineGenerator.curve(curveBasis)([
    [(width / 5.8) * 2.3, 0],
    [(width / 5.3) * 2 + 20, TAB_HEIGHT * 0.6],
    [(width / 4.8) * 3 - 20, TAB_HEIGHT * 0.6],
    [(width / 4.9) * 3, 0],
  ]);

  const d = `${center} ${rect}`;

  const state = {
    pathX: "357",
    pathY: "675",
    pathA: "689",
    pathB: "706",
  };

  // const AsyncWrapper = ({ errorFallback, children }) => {
  //   return (
  //     <Suspense fallback={<div>Loading ...</div>}>
  //       <ErrorBoundary fallback={errorFallback}>{children}</ErrorBoundary>
  //     </Suspense>
  //   )
  // }

  return (
    <Suspense fallback="Loading...">
      <Container>
        {Object.is(series, []) || loading ? (
          <ViewLoading>
            <Loading size="large" color="light-blue" />
          </ViewLoading>
        ) : (
          <ViewList
            data={series}
            renderItem={({ item, index }: Item) => (
              <SerieCard serie={item} index={index} isFirstColumn={isEven(index)} />
            )}
            keyExtractor={(item, index: number) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <ViewTop />}
            ListFooterComponent={() => <ViewBottom />}
          />
        )}
        <Svg x="0px" y="0px" width="100%" height="14.6%" viewBox="0 0 1092 225">
          <Path
            fill="#3c3951"
            d={`M30,60h${state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${state.pathY}.7,74.5,${state.pathA}.5,60,${state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
          />
        </Svg>
        <Button onPress={() => navigate("SerieForm")}>
          <FontAwesome5 name="plus" size={40} color="white" />
        </Button>
      </Container>
    </Suspense>
  );
}
