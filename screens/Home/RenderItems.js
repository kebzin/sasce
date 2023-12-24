import { Text, View } from "react-native";
import ItemImage from "./ItemImage";
import { COLORS, SIZES, FONTS } from "../../constants";
import { TextButton } from "../../components/common";
import { useNavigation } from "@react-navigation/native";

const RenderItems = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.light,
        shadowColor: COLORS.light,
        elevation: 10,

        borderRadius: SIZES.radius,
        flex: 1,
      }}
    >
      <ItemImage
        ContentContainerStyle={{
          height: SIZES.width / 2,
          width: "auto",
        }}
        image={item.image}
        onImagePress={() => navigation.navigate("product", { item })}
      />
      <View
        style={{
          paddingHorizontal: SIZES.base,
          alignItems: "center",
          paddingVertical: SIZES.padding,
        }}
      >
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
          GMD {item.price}
        </Text>
        <TextButton
          label={"Add to cart"}
          labelStyle={{ ...FONTS.body5, color: COLORS.light }}
          contentContainerStyle={{
            borderRadius: SIZES.radius,
            height: 40,
            backgroundColor: COLORS.success,
            paddingHorizontal: SIZES.padding,
          }}
        />
      </View>
    </View>
  );
};

export default RenderItems;
