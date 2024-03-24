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
  ViewAdjust,
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
  confirm_Password,
  ILogin,
  userApi,
  myUserState,
} from "../../store/userRecoil";

import { ParamListBase, RouteProp } from "@react-navigation/native";
import { useAtom, PrimitiveAtom } from "jotai";
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

export default function SeriesPage() {
  // @ts-ignore
  const [series, setSeries] = useAtom<SeriesType[] | undefined>(seriesState);
  const [email, setEmail] = useAtom<string>(emailRecoil);
  const [id, setId] = useState<number[]>();
  const [loading, setLoading] = useAtom(isLoading);
  const [myUser, setMyUser] = useAtom(myUserState);
  const [password, setPassword] = useAtom<string>(passwordRecoil);
  const [confirmPassword, setConfirmPassword] = useAtom<string>(confirm_Password);
  const isFocused = useIsFocused();

  const { navigate } = useNavigation<SerieFormScreenNavigationProp>();

  const routerParams = useRoute<ParamsProps>() || "";

  // const resetEmail = setEmail("");
  // const resetPassword = setPassword("");
  // const resetConfirmPassword = setConfirmPassword("");

  useEffect(() => {
    // resetEmail();
    console.warn("Email: ", email);
    setPassword("");
    setConfirmPassword("");
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("token");
        const validateValueJson =
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log('async object: ', validateValueJson)
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
        console.log(e)
      }

      setLoading(false);
    };
    getData();
    if (isFocused) getData();
  }, [isFocused, setLoading, setSeries]);

  return (
    <Suspense fallback="Loading...">
      <Container>
        <Text>Pegou!!!</Text>
        {Object.is(series, []) || loading ? (
          <ViewLoading>
            <Loading size="large" color="light-blue" />
          </ViewLoading>
        ) : (
          <ViewAdjust sizeE={series!.length}>
            <Text>Pegou2!!!</Text>
            <ViewList
              testID="list"
              data={series}
              renderItem={({ item, index }: Item) => (
                <SerieCard
                  serie={item}
                  index={index}
                  sizeE={series!.length}
                  isFirstColumn={isEven(index)}
                />
              )}
              keyExtractor={(item, index: number) => index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => <ViewTop />}
              ListFooterComponent={() => <ViewBottom />}
            />
          </ViewAdjust>
        )}
        <Button onPress={() => navigate("SerieForm")}>
          <FontAwesome5 name="plus" size={38} color="white" />
        </Button>
      </Container>
    </Suspense>
  );
}
