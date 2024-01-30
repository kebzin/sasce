import React, { useRef } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Animated,
} from "react-native";
import { COLORS, icons, SIZES, images } from "../../constants/index";
import { IconeBotten, InputField } from "../common/index";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = ({ scrollY, Onpress, filterPress }) => {
  // hooks
  const Navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.light08,

        paddingVertical: SIZES.base,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <InputField
        containerStyle={{ flex: 1 }}
        onPress={() => {
          Navigation.navigate("Search");
        }}
        Placeholder={"Search on Category or Product Name"}
        prependComponent={
          <Image source={icons.search} style={style.ImputField} />
        }
        appendComponent={
          <Image source={icons.camera} style={style.ImputField} />
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGrey,
    marginTop: 50,
    paddingVertical: SIZES.base,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LogoContainer: {
    width: 40,
    height: 40,
    overflow: "hidden",
    borderRadius: 10,
  },
  BellContainer: {
    width: 25,
    height: 25,
  },
  ImputField: {
    width: 25,
    height: 25,
    tintColor: COLORS.grey,
  },
});

export default SearchComponent;
