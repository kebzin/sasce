import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { IconeBotten } from "../../components/common";
import { COLORS, SIZES, icons } from "../../constants";

const ProductImageContainer = ({
  ratingPress,
  WithoutFeedBackPress,
  ContentContainerStyle,
  onImagePress,
  image,
}) => {
  return (
    <View
      style={{ position: "relative", ...ContentContainerStyle }}
      onPress={WithoutFeedBackPress}
    >
      <TouchableOpacity onPress={onImagePress}>
        <Image
          resizeMethod="auto"
          src={image}
          style={{
            resizeMode: "stretch",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: COLORS.lightGrey,
          borderRadius: SIZES.base,

          alignItems: "center",
        }}
      >
        <IconeBotten
          containerStyle={{}}
          icone={icons.likeFll}
          iconeStyle={{
            tintColor: COLORS.error,
            width: 40,
            height: 40,
          }}
          Onpress={ratingPress}
        />
      </View>
    </View>
  );
};

export default ProductImageContainer;
