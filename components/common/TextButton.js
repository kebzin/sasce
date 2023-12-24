import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FONTS, COLORS } from "../../constants";

const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  prependContainer,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled ? COLORS.primary60 : COLORS.primary,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
        {label}
      </Text>
      {prependContainer}
    </TouchableOpacity>
  );
};

export default TextButton;
