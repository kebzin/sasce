// PostImageView.js

import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const ImageView = ({ item, onPress }) => (
  <TouchableOpacity>
    <View style={styles.imageItemContainer}>
      <Image
        resizeMethod="auto"
        source={{ uri: item?.uri }}
        style={{
          resizeMode: "contain",
          width: SIZES.width,
          height: "100%",
        }}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageItemContainer: {
    justifyContent: "center",
  },
});

export default ImageView;
