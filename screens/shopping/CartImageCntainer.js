import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, SIZES, icons } from "../../constants";

const CartImageCntainer = ({
  ratingPress,
  WithoutFeedBackPress,
  ContentContainerStyle,
  onImagePress,
  image,
}) => {
  return (
    <View style={{ ...ContentContainerStyle }} onPress={WithoutFeedBackPress}>
      <TouchableOpacity onPress={onImagePress}>
        <Image
          resizeMethod="auto"
          source={image}
          style={{
            resizeMode: "stretch",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartImageCntainer;
