import React, { useEffect, useState, useRef } from "react";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Slider } from "@miblanchard/react-native-slider";
import { View, TextInput as RNTextInput, TextInputProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import Buffer from "buffer";

import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TextArea,
  ImageBackground,
  ViewRate,
  ViewButton,
  ViewButtonClean,
  ViewButtonImage,
  Button,
  ButtonClean,
  Loading,
  Text,
  IconContainer,
  PickerContainer,
  SliderContainer,
} from "./styles";

import FormRow from "../../components/FormRow";

import {
  setFieldAtom,
  saveSerie,
  userId,
  serieIndex,
} from "../../store/serieFormRecoil";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MainScreenNavigationProp } from "../../types/navigation";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  emailRecoil as emailRecoilState,
  ILogin,
  myUserState,
  userState,
} from "../../store/userRecoil";
import {
  postImageState,
  getImageState,
  postImage,
} from "../../store/serieFormRecoil";
import { seriesApi } from "../../services/api";
import { SeriesType } from "../../interfaces/seriesType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

type StackParamsList = {
  SerieForm: {
    serieToEdit: SeriesType;
    index: number;
  };
};

export default function SerieFormPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serieFormAtom, setSerieFormAtom] =
    useRecoilState<SeriesType>(setFieldAtom);
  const [myFilterId, setMyFilterId] = useRecoilState<number>(serieIndex);
  const [user, setUser] = useRecoilState(myUserState);
  const [myId, setMyId] = useRecoilState(userId);
  const resetForm = useResetRecoilState(setFieldAtom);

  const route = useRoute<RouteProp<StackParamsList, "SerieForm">>();
  const navigation = useNavigation<MainScreenNavigationProp>();

  const input2Ref = useRef<RNTextInput & TextInputProps>(null);

  useEffect(() => {
    const { params } = route;
    if (params && params.serieToEdit) {
      const serieToEdit = params.serieToEdit;
      setSerieFormAtom(serieToEdit);
    } else {
      resetForm();
    }
  }, [route, setSerieFormAtom]);

  useEffect(() => {
    async function getStorage() {
      const jsonValue = await AsyncStorage.getItem("id");
      const validateValueJson =
        jsonValue != null ? JSON.parse(jsonValue) : null;

      setMyId(String(validateValueJson));
    }
    getStorage();
  }, []);

  useEffect(() => {
    async function getIndex() {
      const jsonValue = await AsyncStorage.getItem("id");
      const validateValueJson =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      const { params } = route;
      const myIndex = params.index;
      const filterId = validateValueJson.find(
        (item: any, index: any) => index == myIndex
      );
      setMyFilterId(filterId != null ? filterId : 100);
    }
    if (route.params) getIndex();
  }, []);

  async function pickImage() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Você precisa permitir o acesso!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1], // Android only
    });

    if (!result.cancelled) {
      setSerieFormAtom({ ...serieFormAtom, img: result.base64 });
    }
  }

  const selectEvaluation = () => {
    switch (String(serieFormAtom.rate)) {
      case "10":
        return "(1) Terrível";
      case "20":
        return "(2) Horrível";
      case "30":
        return "(3) Muito ruim";
      case "40":
        return "(4) Ruim";
      case "50":
        return "(5) Média";
      case "60":
        return "(6) Quase bom";
      case "70":
        return "(7) Bom";
      case "80":
        return "(8) Muito bom";
      case "90":
        return "(9) Ótimo";
      case "100":
        return "(10) Obra-prima";
      default:
        return "Sem avaliação";
    }
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} enabled>
      <ScrollView
        contentContainerStyle={{ padding: 10 }}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
      >
        <FormRow first>
          <TextInput
            placeholder="Título"
            returnKeyType="next"
            blurOnSubmit={false}
            placeholderTextColor="#808080"
            value={serieFormAtom.title}
            onChangeText={(value) =>
              setSerieFormAtom({ ...serieFormAtom, title: value })
            }
            onSubmitEditing={() => input2Ref.current!.focus()}
          />
        </FormRow>

        <FormRow>
          {serieFormAtom.img ? (
            <ImageBackground
              source={{
                uri: `data:image/jpeg;base64,${serieFormAtom.img}`,
              }}
            />
          ) : (
            <IconContainer>
              <MaterialIcons name="image" size={120} color="black" />
            </IconContainer>
          )}
          <ViewButtonImage>
            <Button onPress={() => pickImage()}>
              <Text>Selecione uma imagem</Text>
            </Button>
          </ViewButtonImage>
        </FormRow>

        <FormRow>
          <PickerContainer>
            <Picker
              style={{
                backgroundColor: "transparent",
              }}
              selectedValue={serieFormAtom.gender}
              onValueChange={(itemValue) =>
                setSerieFormAtom({ ...serieFormAtom, gender: itemValue })
              }
            >
              <Picker.Item label="Policial" value="Policial" color="#808080" />
              <Picker.Item label="Comédia" value="Comédia" color="#808080" />
              <Picker.Item label="Terror" value="Terror" color="#808080" />
              <Picker.Item
                label="Ficção Científica"
                value="Ficção Científica"
                color="#808080"
              />
              <Picker.Item label="Ação" value="Ação" color="#808080" />
              <Picker.Item label="Drama" value="Drama" color="#808080" />
            </Picker>
          </PickerContainer>
        </FormRow>

        <FormRow>
          <ViewRate>
            <Text>Nota:</Text>
            <Text>{selectEvaluation()}</Text>
          </ViewRate>
          <SliderContainer>
            <Slider
              containerStyle={{ height: 20 }}
              trackStyle={{
                height: 12,
                borderRadius: 10,
                marginLeft: 5,
                marginRight: 2,
              }}
              minimumTrackTintColor="#007fff"
              maximumTrackTintColor="transparent"
              thumbTintColor="white"
              onValueChange={(value) =>
                setSerieFormAtom({ ...serieFormAtom, rate: Number(value) })
              }
              value={serieFormAtom.rate}
              minimumValue={0}
              maximumValue={100}
              step={10}
            />
          </SliderContainer>
        </FormRow>

        <FormRow>
          <TextArea
            placeholder="Descrição"
            placeholderTextColor="#808080"
            value={serieFormAtom.description}
            onChangeText={(value: string) =>
              setSerieFormAtom({ ...serieFormAtom, description: value })
            }
            ref={input2Ref}
            numberOfLines={4}
            multiline={true}
          />
        </FormRow>

        {isLoading ? (
          <Loading color="light-blue" size="large" />
        ) : (
          <ViewButton>
            <Button
              onPress={async () => {
                setIsLoading(true);
                try {
                  await saveSerie(
                    serieFormAtom,
                    user.email,
                    user.token,
                    user.uid,
                    myFilterId
                  );
                  resetForm();
                  navigation.goBack();
                } catch (error: any) {
                  Alert.alert("Erro!", error.message);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <Text>Salvar</Text>
            </Button>
          </ViewButton>
        )}

        {serieFormAtom._id ? (
          <View style={{ marginBottom: 100 }}></View>
        ) : (
          <ViewButtonClean>
            <ButtonClean
              onPress={() => {
                resetForm();
              }}
            >
              <Text>Limpar Formulário</Text>
            </ButtonClean>
          </ViewButtonClean>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
