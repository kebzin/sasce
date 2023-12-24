import { Text, View } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import { TextButton } from "../../components/common";
import { useNavigation } from "@react-navigation/native";
import CartImageCntainer from "./CartImageCntainer";
import { removeFromCart } from "../../lib/Helpers/AddToCardHelper";

const RenderCart = ({ item, setCard, card }) => {
  const navigation = useNavigation();

  //function that add to cart
  const handleRemoveCart = () => {
    removeFromCart(item, card, setCard);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.light,
        shadowColor: COLORS.light,
        elevation: 10,
        borderRadius: SIZES.radius,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CartImageCntainer
        ContentContainerStyle={{
          height: SIZES.width / 2.7,
          width: SIZES.height / 5.5,
          flex: 1,
        }}
        image={item.image}
        onImagePress={() => navigation.navigate("product", { item })}
      />
      <View
        style={{
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.padding,
          flex: 1,
        }}
      >
        <Text
          style={{
            ...FONTS.h5,
            fontVariant: "h1",
            color: COLORS.dark60,
            lineHeight: 18,
            marginTop: 10,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text style={{ ...FONTS.body5, color: COLORS.grey }}>Category:</Text>
          <Text style={{ color: COLORS.success }}>{item.category}</Text>
        </View>
        <Text style={{ color: COLORS.success, ...FONTS.h3 }}>
          GMD {item.price}
        </Text>
        <TextButton
          onPress={() => handleRemoveCart(item)}
          label={"Remove product"}
          labelStyle={{ ...FONTS.body5, color: COLORS.light }}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            height: 40,
            backgroundColor: COLORS.error,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.base,
          }}
        />
      </View>
    </View>
  );
};

export default RenderCart;
