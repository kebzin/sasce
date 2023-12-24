// ImageGallary.js

import React from "react";
import { FlatList, ToastAndroid } from "react-native";
import BottomSheetEmptyView from "../bottomsheetcomponent/BottomSheetEmptyView";
import { SIZES } from "../../constants";
import ImageView from "./ImageView";

const ImageGallary = ({
  images,
  showModal,
  setShowImagePrivewModal,
  OnImagePress,
}) => (
  <BottomSheetEmptyView
    Onclose={() => setShowImagePrivewModal(false)}
    height={SIZES.height - 300}
    openModal={showModal}
    renderChildrents={
      <>
        {ToastAndroid.show("Swipe Right", ToastAndroid.SHORT)}
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.uri + index}
          renderItem={({ item }) => <ImageView item={item} />}
          snapToInterval={SIZES.width}
          bounces={true}
          decelerationRate={"fast"}
        />
      </>
    }
  />
);

export default ImageGallary;
