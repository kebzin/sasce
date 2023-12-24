import { Text, View } from "react-native";
import React from "react";
import BottomSheetEmptyView from "../bottomsheetcomponent/BottomSheetEmptyView";
import { COLORS, FONTS, SIZES } from "../../constants";
import TextButton from "./TextButton";

const SuccessOrError = ({
  height,
  openModal,
  setOpenModal,
  Status,
  LableMessage,
  message,
  title,
}) => {
  return (
    <BottomSheetEmptyView
      height={height}
      openModal={openModal}
      renderChildrents={
        <View>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.h3,
              marginVertical: SIZES.base,
              color: Status === "Error" ? COLORS.error : COLORS.primary,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.body4,
              paddingHorizontal: SIZES.padding,
              color: COLORS.grey80,
            }}
          >
            {message}
          </Text>

          <TextButton
            onPress={setOpenModal}
            label={LableMessage}
            contentContainerStyle={{
              margin: SIZES.padding,
              borderRadius: SIZES.radius - 3,
              height: 50,
              backgroundColor:
                Status === "Error" ? COLORS.error : COLORS.primary,
            }}
          />
        </View>
      }
    />
  );
};

export default SuccessOrError;
