import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { IconeBotten } from "../../components/common";
import { COLORS, SIZES, icons } from "../../constants";

const ItemImage = ({
  WithoutFeedBackPress,
  ContentContainerStyle,
  onImagePress,
  image,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iconLike, setIconeLike] = useState(true);

  return (
    <View
      style={{ position: "relative", ...ContentContainerStyle }}
      onPress={WithoutFeedBackPress}
    >
      <TouchableOpacity onPress={onImagePress}>
        <Image
          progressiveRenderingEnabled={true}
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
          top: 10,
          right: 10,
          backgroundColor: COLORS.lightGrey,
          borderRadius: SIZES.base,
          alignItems: "center",
        }}
      >
        {/* <IconeBotten
          containerStyle={{}}
          icone={iconLike ? icons.like : icons.likeFll}
          iconeStyle={{
            tintColor: COLORS.error,
            width: 30,
            height: 30,
          }}
          Onpress={() => setIconeLike((prev) => !prev)}
        /> */}
      </View>
    </View>
  );
};

export default ItemImage;
