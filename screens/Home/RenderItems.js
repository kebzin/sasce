import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ItemImage from "./ItemImage";
import { COLORS, SIZES, FONTS } from "../../constants";
import { TextButton } from "../../components/common";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../../lib/Helpers/AddToCardHelper";
import { formatCurrency } from "../../lib/Helpers/TimeAgo";

const RenderItems = memo(({ item, setCard, card }) => {
  const navigation = useNavigation();

  const handleAddToCart = () => {
    addToCart(item, card, setCard);
  };

  const containerStyle = {
    backgroundColor: COLORS.light,
    shadowColor: COLORS.light,
    elevation: 10,
    borderRadius: SIZES.radius,
    flex: 1,
  };

  const textContainerStyle = {
    paddingHorizontal: SIZES.base,
    alignItems: "center",
    paddingVertical: SIZES.padding,
  };

  return (
    <View style={containerStyle}>
      <ItemImage
        onImagePress={() => {
          navigation.navigate("product", { item });
        }}
        ContentContainerStyle={{
          height: SIZES.width / 2,
          width: "auto",
        }}
        image={item.image}
      />
      <View style={textContainerStyle}>
        <Text
          style={{
            ...FONTS.h5,
            fontVariant: "h1",
            color: COLORS.dark60,
            lineHeight: 18,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{ ...FONTS.body5, color: COLORS.grey, textAlign: "center" }}
          >
            Category:
          </Text>
          <Text style={{ color: COLORS.success }}>{item.category}</Text>
        </View>
        <Text
          style={{ color: COLORS.success, ...FONTS.h3, textAlign: "center" }}
        >
          {formatCurrency(item.price)}
        </Text>
        <TextButton
          onPress={handleAddToCart}
          label={"Add to cart"}
          labelStyle={{ ...FONTS.body5, color: COLORS.light }}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            height: 40,
            backgroundColor: COLORS.success,
            paddingHorizontal: SIZES.padding,
          }}
        />
        {card.find((product) => product.id === item.id) ? (
          <Text style={{ fontSize: 12, color: COLORS.error }}>
            Already in cart
          </Text>
        ) : null}
      </View>
    </View>
  );
});

export default RenderItems;
