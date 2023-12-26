import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useData } from "../../hook/useData";

const Terms = () => {
  const { sample } = useData();
  console.log(sample[0].image);
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Image
        onError={(event) => console.log(event)}
        onLoadStart={() => console.log("loading")}
        onLoad={() => console.log("loaded")}
        src={sample[0].image}
        resizeMode="stretch"
        width={100}
        height={100}
        style={{ resizeMode: "contain", width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({});
