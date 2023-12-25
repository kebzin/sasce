import React, { useState } from "react";
import { useData } from "../../hook/useData";
import { CheckBox, TextButton } from "../../components/common";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS } from "../../constants";
import RenderCart from "./RenderCart";
import { StyleSheet, Text, View } from "react-native";

const Shopping = () => {
  const [check, setCheck] = useState(false);
  const { card, setCard } = useData();
  const quantity = card?.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = card?.reduce((acc, item) => acc + item.price, 0);

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
      <View style={styles.shippingInfoContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.grey }}>
            Nagaw delivery company
          </Text>
          <CheckBox isSelected={check} Onpress={() => setCheck(!check)} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.grey }}>Local pickup</Text>
          <CheckBox
            isSelected={check === false ? !check : null}
            Onpress={() => setCheck(!check)}
          />
        </View>

        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Number of items</Text>
          <Text style={styles.shippingInfoPrice}>{quantity}</Text>
        </View>
        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Shipping</Text>
          <Text style={styles.shippingInfoPrice}>GMD {check ? 300 : 0.0}</Text>
        </View>
        <View style={styles.shippingInfoItem}>
          <Text style={styles.shippingInfoTitle}>Sub Total</Text>
          <Text style={styles.shippingInfoPrice}>
            GMD {check ? totalPrice + 300 : totalPrice}
          </Text>
        </View>
        <TextButton
          // onPress={() => handleAddToCart(item)}
          label={"Checkout"}
          labelStyle={styles.checkoutButtonLabel}
          contentContainerStyle={styles.checkoutButton}
        />
      </View>
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
    flex: 1,
    borderTopRightRadius: SIZES.radius + 15,
    borderTopLeftRadius: SIZES.radius + 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    paddingHorizontal: SIZES.padding,
    shadowOpacity: 3.25,
    shadowRadius: 3.84,
    elevation: 10,
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
    color: COLORS.grey,
    paddingVertical: SIZES.base - 5,
  },
  shippingInfoPrice: {
    ...FONTS.h4,
    color: COLORS.dark60,
  },
  checkoutButton: {
    borderRadius: SIZES.radius,
    height: 55,
    backgroundColor: COLORS.success,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.base,
  },
  checkoutButtonLabel: {
    ...FONTS.body5,
    color: COLORS.light,
  },
});

export default Shopping;
