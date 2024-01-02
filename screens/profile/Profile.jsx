import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { IconeBotten, TextButton } from "../../components/common";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import { useAuth } from "../../hook/useAuth";

// import LoginPopUp from "../../healper/LoginPopUp";

const Profile = ({ navigation }) => {
  const { session, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerTopContainer}></View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.shadowContainer}>
          <RenderProfileContent
            onPress={() => {
              session === null
                ? alert("please log in to see your account details")
                : navigation.navigate("account");
            }}
            Title={"Account"}
            IconLeft={icons.person2}
            description="See your profile info"
            IconRight={icons.eye}
          />

          <RenderProfileContent
            Title={"Orders"}
            onPress={() => {
              session === null
                ? alert("please log in to see your your orders")
                : navigation.navigate("orders");
            }}
            IconLeft={icons.shoppingBag}
            description="See all your orders "
            IconRight={icons.eye}
          />

          <RenderProfileContent
            Title={"Term of use"}
            onPress={() => navigation.navigate("term")}
            IconLeft={icons.condition}
            description="Manage all your items"
            IconRight={icons.eye}
          />
          {/* <RenderProfileContent
            Title={"Support"}
            IconLeft={icons.bell}
            IconRight={icons.eye}
            description="Messages you sent or received"
          /> */}
        </View>

        {session === null ? (
          <TextButton
            onPress={() => navigation.navigate("login")}
            label={"Logg In"}
            contentContainerStyle={{
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.success,
            }}
            labelStyle={{ color: COLORS.light }}
          />
        ) : (
          <TextButton
            onPress={() => signOut()}
            label={"Log out"}
            contentContainerStyle={{
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.success,
            }}
            labelStyle={{ color: COLORS.light }}
          />
        )}
        {/* Repeat the above code blocks for other sections */}
      </ScrollView>
    </View>
  );
};

const RenderProfileContent = ({
  onPress,
  Title,
  description = "",
  IconLeft,
  IconRight,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profileContentContainer}>
      <View style={styles.profileContent}>
        <IconeBotten
          icone={IconLeft}
          iconeStyle={{ width: 25, height: 25, tintColor: COLORS.grey80 }}
        />
        <View>
          <Text style={styles.profileContentTitle}>{Title}</Text>
          {description.length > 0 && (
            <Text style={styles.profileContentDescription}>{description}</Text>
          )}
        </View>
      </View>
      <IconeBotten
        icone={IconRight}
        iconeStyle={{ width: 20, height: 20, tintColor: COLORS.support2 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: SIZES.padding - 10,
  },
  headerTopContainer: {
    height: SIZES.padding * 4,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SIZES.base,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileTextContainer: {
    marginLeft: SIZES.padding,
  },
  profileName: {
    ...FONTS.h3,
    color: COLORS.dark,
  },
  personalInfo: {
    ...FONTS.h4,
    color: COLORS.secondary,
  },
  counterContainer: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    backgroundColor: COLORS.light,
    height: SIZES.padding * 3.3,
    bottom: -SIZES.padding * 2,
    left: SIZES.radius,
    right: SIZES.radius,

    shadowColor: "#000",
    elevation: 20,
    borderRadius: SIZES.radius,
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
    justifyContent: "space-between",
  },
  counterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  counterIcon: {
    width: 30,
    height: 30,
  },
  counterExchangeIcon: {
    tintColor: COLORS.error80,
  },
  counterValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  counterLabel: {
    color: COLORS.grey,
    ...FONTS.body5,
  },
  scrollViewContentContainer: {
    paddingBottom: SIZES.padding,
  },
  shadowContainer: {
    backgroundColor: COLORS.light,
    elevation: 2,
    borderRadius: SIZES.base,
    marginBottom: SIZES.radius - 2,
  },
  loginPromptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonsContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: COLORS.grey20,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.base,
    borderRadius: 7,
  },
  loginButton: {
    height: 50,
    flex: 1,
    borderRadius: SIZES.radius,
  },
  profileContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.base * 1.5,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileContentTitle: {
    ...FONTS.h4,
    color: COLORS.dark,
  },
  profileContentDescription: {
    ...FONTS.body5,
    color: COLORS.grey,
    lineHeight: 15,
    marginTop: 3,
  },
});

export default Profile;
