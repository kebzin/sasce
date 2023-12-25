import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { FONTS, icons, COLORS, SIZES } from "../../constants/index";
const CheckBox = ({ containerStyle, isSelected, Onpress }) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={Onpress}
    >
      <View
        style={{
          width: 25,
          height: 25,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZES.base,
          borderWidth: 1,
          borderColor: COLORS.success,
          backgroundColor: isSelected ? COLORS.success : null,
        }}
      >
        {isSelected && (
          <Image
            source={icons.checkmark}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.light,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
