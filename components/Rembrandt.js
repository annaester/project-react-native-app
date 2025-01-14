import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { REMBRANDT_URL } from "../utils/urls";
import {
  ArtistBox,
  FadeBox,
  BioText,
  ArtistImg,
  TitleText,
  ArtistButton,
  ButtonText,
} from "./Theme";

const Rembrandt = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const getRembrandt = () => {
    setLoading(true);
    fetch(REMBRANDT_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.artObjects);
      })
      .finally(() => setLoading(false), setShowButton(false));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#5E3B3E" />;
  }

  return (
    <ArtistBox>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          widht: 350,
        }}
      >
        <FadeBox>
          <BioText>
            Rembrandt Harmenszoon van Rijn 1606– 1669 usuallyknown as Rembrandt,
            was a Dutch Golden Age painter, printmaker and draughtsman. An
            innovative and prolific master in three media, he is generally
            considered one of the greatest visual artists in the history of art
            and the most important in Dutch art history. Unlike most Dutch
            masters of the 17th century, Rembrandt's works depict a wide range
            of style and subject matter, from portraits and self-portraits to
            landscapes, genre scenes, allegorical and historical scenes, and
            biblical and mythological themes as well as animal studies.
          </BioText>
        </FadeBox>
        {showButton && (
          <ArtistButton onPress={getRembrandt}>
            <ButtonText>SEE HIS WORK</ButtonText>
          </ArtistButton>
        )}
        {data.length > 0 &&
          data
            .filter((item) => item.hasImage === true)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((art) => (
              <View
                key={art.id}
                style={{
                  padding: 7,
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TitleText>{art.title}</TitleText>
                {art?.webImage?.url && (
                  <ArtistImg
                    source={{ uri: `${art?.webImage?.url}` }}
                    style={{ resizeMode: "contain" }}
                  />
                )}
              </View>
            ))}
      </ScrollView>
    </ArtistBox>
  );
};

export default Rembrandt;
