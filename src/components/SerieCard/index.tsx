import React from "react";

import { SeriesCard, Card, Image, CardTitleWrapper, CardTitle } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { SeriesType } from "../../interfaces/seriesType";
import { useNavigation } from "@react-navigation/native";
import { SerieFormScreenNavigationProp, SerieDetailScreenNavigationProp } from "../../types/navigation";

type Props = {
  serie: {
    _id?: string | null;
    title: string;
    gender: string;
    rate: number | number[];
    img64?: string;
    description: string;
    isLast?: boolean;
    index?: number;
  },
  isFirstColumn: any;
  index: number;
}

const SerieCard = ({
  serie,
  isFirstColumn,
  index
}: Props) => {

  const navigation = useNavigation<SerieFormScreenNavigationProp>();
  return (
    <SeriesCard isFirstColumn={isFirstColumn} onPress={() => navigation.navigate("SerieDetail", { serie: serie, index: index })}>
      <Card>
        <Image
          serie={serie.img64}
          source={{
            uri: `data:image/jpeg;base64,${serie.img64}`,
          }}
          aspectRatio={1}
          resizeMode="stretch"
        />
        <CardTitleWrapper>
          <CardTitle adjustsFontSizeToFit={true} numberOfLines={1}>
            {serie!.title}
          </CardTitle>
        </CardTitleWrapper>
      </Card>
    </SeriesCard>
  );
};

export default SerieCard;
