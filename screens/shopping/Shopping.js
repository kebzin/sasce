import React, { useState } from "react";
import { useData } from "../../hook/useData";
import { CheckBox, TextButton } from "../../components/common";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS } from "../../constants";
import RenderCart from "./RenderCart";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hook/useAuth";
import Popup from "../../components/common/Popup";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../../lib/Helpers/TimeAgo";

const Shopping = () => {
  const { session } = useAuth();
  const [check, setCheck] = useState("Local pickup");
  const { card, setCard } = useData();
  const quantity = card?.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = card?.reduce((acc, item) => acc + item.price, 0);
  const [popup, setpopup] = useState(false);
  const Navigation = useNavigation();

  // befor processing to checkout see if the user is log in
  const handleCheckoutProcceed = () => {
    if (session === null) {
      return setpopup(true);
    }
    if (card.length === 0) {
      return alert(
        "you haven't select any product. please select a product to proceed to checkout"
      );
    }
    const shipping = check === "Nagaw delivery company" ? 300 : 0;

    // when the check is true it mean the user sellect nagaw delivery method els if the check is false it means the user select local delivery
    Navigation.navigate("checkout", { check, shipping });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.contentContainer}>
        <FlatList
          data={card}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <RenderCart item={item} card={card} setCard={setCard} />;
          }}
          contentContainerStyle={{
            rowGap: 20,
            marginTop: 15,
          }}
        />
      </View>
      <ScrollView style={styles.shippingInfoContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.light80 }}>
            Nagaw delivery company
          </Text>
          <CheckBox
            isSelected={check === "Nagaw delivery company" ? true : false}
            Onpress={() => setCheck("Nagaw delivery company")}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.light80 }}>
            Local pickup
          </Text>
          <CheckBox
            isSelected={check === "Local pickup" ? true : false}
            Onpress={() => setCheck("Local pickup")}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.light80 }}>
            Bank Transfer
          </Text>
          <CheckBox
            isSelected={check === "Bank Transfer" ? true : false}
            Onpress={() => setCheck("Bank Transfer")}
          />
        </View>

        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Number of items</Text>
          <Text style={styles.shippingInfoPrice}>{quantity}</Text>
        </View>

        {check === "Bank Transfer" && (
          <View style={{ paddingVertical: SIZES.padding }}>
            <Text>Bank details</Text>

            <View style={styles.shippingInfoItem}>
              <Text style={styles.shippingInfoTitle}>Bank Name</Text>
              <Text style={styles.shippingInfoPrice}>ECOBANK(GAMBIA)</Text>
            </View>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.shippingInfoTitle}>Account Number</Text>
              <Text style={styles.shippingInfoPrice}>6240024479</Text>
            </View>

            <Text
              style={{
                ...FONTS.body5,
                lineHeight: 16,
                color: COLORS.light,
                paddingTop: 10,
              }}
            >
              Note: Please Make your payment directly into our bank account.
              Your order will not be shipped until the funds have cleared in our
              account. Send the screenshot of the patment to this number
              20231227
            </Text>
          </View>
        )}

        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Shipping</Text>
          <Text style={styles.shippingInfoPrice}>
            {check === "Nagaw delivery company"
              ? formatCurrency(300)
              : formatCurrency(0)}
          </Text>
        </View>
        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Sub Total</Text>
          <Text style={styles.shippingInfoPrice}>
            {check == "Nagaw delivery company"
              ? formatCurrency(totalPrice + 300)
              : formatCurrency(totalPrice)}
          </Text>
        </View>
        <TextButton
          onPress={handleCheckoutProcceed}
          label={"Checkout"}
          labelStyle={styles.checkoutButtonLabel}
          contentContainerStyle={styles.checkoutButton}
        />
      </ScrollView>

      {/* poppup */}
      {popup && (
        <Popup
          openModal={popup}
          setShowModal={setpopup}
          Onclose={() => setpopup((prev) => !prev)}
          height={SIZES.height / 3}
          renderChildrents={
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.h3,
                  color: COLORS.error60,
                }}
              >
                Oops not logIn
              </Text>
              <Text
                style={{
                  ...FONTS.body5,
                  lineHeight: 19,
                  color: COLORS.dark60,
                  paddingVertical: SIZES.base,
                }}
              >
                Thank you for visiting! It seems that you are currently not
                logged in. To proceed to checkout, kindly log in. If you do not
                have an account, we invite you to create one for a seamless
                experience. Your satisfaction is our priority, and we appreciate
                your time with us
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TextButton
                  label={"Create account"}
                  contentContainerStyle={{
                    flex: 1,
                    height: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.success,
                    marginRight: SIZES.base,
                  }}
                  onPress={() => {
                    setpopup(false), Navigation.navigate("register");
                  }}
                  labelStyle={{ ...FONTS.body5, color: COLORS.light }}
                />
                <TextButton
                  onPress={() => {
                    setpopup(false), Navigation.navigate("login");
                  }}
                  label={"LoggIn"}
                  contentContainerStyle={{
                    flex: 1,
                    height: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.success,
                    marginRight: SIZES.base,
                  }}
                  labelStyle={{ ...FONTS.body5, color: COLORS.light }}
                />
              </View>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SIZES.padding,
    flex: 2,
  },
  shippingInfoContainer: {
    paddingVertical: SIZES.padding,
    flex: 1.5,
    borderTopRightRadius: SIZES.radius + 15,
    borderTopLeftRadius: SIZES.radius + 15,
    backgroundColor: COLORS.primary,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 1,
    //   height: 2,
    // },
    paddingHorizontal: SIZES.padding,
    // shadowOpacity: 3.25,
    // shadowRadius: 3.84,
    // elevation: 10,
    flexDirection: "column",
  },
  shippingInfoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.success,
  },
  shippingInfoTitle: {
    ...FONTS.h5,
    color: COLORS.light80,
    paddingVertical: SIZES.base - 5,
  },
  shippingInfoPrice: {
    ...FONTS.h4,
    color: COLORS.light,
  },
  checkoutButton: {
    borderRadius: SIZES.radius,
    height: 55,
    backgroundColor: COLORS.success,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.base,
    marginBottom: SIZES.padding,
  },
  checkoutButtonLabel: {
    ...FONTS.body5,
    color: COLORS.light,
  },
});

export default Shopping;
