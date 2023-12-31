import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { COLORS, icons, SIZES, FONTS, images } from "../../constants/index";
import { useData } from "../../hook/useData";
// import { useAuth } from "../../hook/useAuth";
import { useNavigation } from "@react-navigation/native";
const HeaderComponent = ({ scrollY, onPress, Title, messagePress }) => {
  const navigation = useNavigation();
  const { card } = useData();
  const handleCartPress = () => {
    // Navigate to the cart screen here
    navigation.navigate("cart");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={
          styles.header
          //transform: [{ translateY: headerTranslateY }],
        }
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image style={{ width: 50, height: 50 }} source={images.logo} />
          </View>
          <Text style={styles.title}>{Title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <TouchableOpacity onPress={handleCartPress} style={styles.bellContainer}>
              <Image source={icons.shoppingCart} style={styles.bellIcon} />
              <Text
                style={{
                  top: 0,
                  right: 0,
                  position: "absolute",
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.error,
                  ...FONTS.h3,
                }}
              >
                {card.length === 0 ? null : card.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: StatusBar.currentHeight,

    paddingHorizontal: SIZES.padding - 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    width: 50,
    height: 50,
    // overflow: "hidden",
    borderRadius: 10,
  },
  logo: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
  },
  title: {
    ...FONTS.h3,
    color: COLORS.light,
  },
  bellContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.grey80,
    borderRadius: SIZES.radius - 5,
    padding: 3,
    position: "relative",
  },
  bellIcon: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    tintColor: COLORS.light,
  },
});

export default HeaderComponent;
