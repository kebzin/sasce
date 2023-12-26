import React, { Children } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/index";

const Popup = ({
  openModal,
  Onclose,
  height,
  setShowModal,
  renderChildrents,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <TouchableWithoutFeedback onPress={Onclose} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.dark80,
          }}
        >
          <View
            style={{
              height: height,
              width: SIZES.width * 0.9,
              backgroundColor: COLORS.light,
              borderRadius: SIZES.radius,
            }}
          >
            {renderChildrents}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Popup;
