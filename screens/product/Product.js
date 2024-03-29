import { ScrollView, StyleSheet, Text, View,ActivityIndicator ,Image } from "react-native";
import React, { useState } from "react";
import ItemImage from "../Home/ItemImage";
import ProductImageContainer from "./ProductImageContainer";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { IconeBotten, TextButton } from "../../components/common";
import { addToCart } from "../../lib/Helpers/AddToCardHelper";
import { useData } from "../../hook/useData";
import { formatCurrency } from "../../lib/Helpers/TimeAgo";

const Product = ({ route }) => {
  const { card, setCard } = useData();

  const [quantit, setQuantity] = useState(card[0]?.quantity);
  // handle quantity add
  const handleQuantityAdd = () => {
    setQuantity(quantit + 1);
  };
  // handle quantity remove
  const handleQuantityRemove = () => {
    if (quantit === 0) {
      return;
    }
    setQuantity(quantit - 1);
  };
  const { item } = route.params;

  // function that add to cart
  const handleAddToCart = () => {
    addToCart(item, card, setCard, quantit, (reduceQuantity = false));
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
  
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
  <ScrollView>
      <View style={{ height: SIZES.height / 2.4 }}>
      <ProductImageContainer image={item.image} onLoad={handleImageLoad} />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100, // Add additional padding at the top
          }}
        >
      
        </View>
      )}
    </View>
      {!error && !loading && (
        <Image
          source={{ uri: item.image }}
          style={{ flex: 1, resizeMode: 'cover' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {error && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.error, fontSize: 16 }}>Image failed to load</Text>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: SIZES.padding,
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
          shadowOpacity: 3.25,
          shadowRadius: 3.84,
          elevation: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: SIZES.padding,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.dark60,
              lineHeight: 18,
              paddingVertical: SIZES.base,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: "row",
            }}
          >
            <IconeBotten
              iconeStyle={{ tintColor: COLORS.success80 }}
              icone={icons.rating}
            />
            <Text style={{ ...FONTS.h5 }}>2</Text>
          </View>
        </View>

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

        <Text style={{ ...FONTS.body5, color: COLORS.grey }}>
          {item.description}:
        </Text>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: SIZES.padding,
          }}
        >
          <View>
            <Text style={{ ...FONTS.body5, color: COLORS.grey }}>Price</Text>
            <Text style={{ color: COLORS.success, ...FONTS.h3 }}>
              {formatCurrency(item.price)}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* <IconeBotten
              Onpress={handleQuantityAdd}
              containerStyle={{
                backgroundColor: COLORS.success,
                borderRadius: SIZES.radius,
                padding: SIZES.base,
              }}
              icone={icons.add}
              iconeStyle={{ tintColor: COLORS.light }}
            /> */}
            {/* <Text style={{ ...FONTS.h1 }}>{quantit}</Text>
            <IconeBotten
              Onpress={handleQuantityRemove}
              containerStyle={{
                backgroundColor: COLORS.success,
                borderRadius: SIZES.radius,
                padding: SIZES.base,
              }}
              icone={icons.remove}
              iconeStyle={{ tintColor: COLORS.light }}
            /> */}
          </View>
        </View>
        {card.find((product) => product.id === item.id) ? (
          <Text style={{ ...FONTS.body5, color: COLORS.error }}>
            Product already in the cart
          </Text>
        ) : null}

        <TextButton
          onPress={() => handleAddToCart(item)}
          label={"Add to cart"}
          labelStyle={{ ...FONTS.body5, color: COLORS.light }}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            height: 40,
            backgroundColor: COLORS.success,
            paddingHorizontal: SIZES.padding,
          }}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
