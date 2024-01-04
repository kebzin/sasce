import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import ItemImage from "../Home/ItemImage";
import { COLORS, SIZES, FONTS } from "../../constants";
import { formatCurrency, timeAgo } from "../../lib/Helpers/TimeAgo";
import { useNavigation } from "@react-navigation/native";

const ClientComponent = memo(({ item }) => {
  const Navigation = useNavigation();
  const fullTime = timeAgo(item?.created_at);

  return (
    <View
      style={{
        backgroundColor: COLORS.light,
        borderRadius: SIZES.base,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
    >
      <View>
        <Text style={{ ...FONTS.h3, paddingVertical: SIZES.base }}>
          Preson Details
        </Text>

        <RenderTable
          lable={"Full Name"}
          name={item?.firstname + " " + item?.lastname}
        />
        <RenderTable lable={"countery/region"} name={item?.countery_region} />
        <RenderTable lable={"Town/City"} name={item?.town_city} />
        <RenderTable lable={"Street Address"} name={item?.streetaddress} />
        <RenderTable lable={"State/Region "} name={item?.state_country} />
        <RenderTable lable={"Delivery Type"} name={item?.deriverytype} />
        <RenderTable lable={"Payment Method"} name={item?.paymentmethod} />

        <RenderTable
          lable={"Shipping Fee"}
          name={formatCurrency(item?.shippingfee || 0)}
        />
        <RenderTable lable={"Email Address"} name={item?.email} />
        <RenderTable lable={"Phone Number"} name={item?.phone} />
        <View></View>
        <RenderTable
          lable={"Order Status"}
          namestyle={{
            color:
              item?.status === "Pending"
                ? COLORS.error
                : item?.status === "Processing"
                ? COLORS.support2
                : COLORS.primary,
          }}
          name={item?.status}
        />
        <RenderTable lable={"Order Date"} name={fullTime} />
      </View>

      <Text style={{ ...FONTS.h3, paddingVertical: SIZES.base }}>
        Order Items
      </Text>
      <View style={{}}>
        {item?.oders?.map((element) => {
          // console.log(element);
          const parsedElement = JSON.parse(element);
          return (
            <View
              key={parsedElement.id}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                paddingVertical: SIZES.base - 5,
                justifyContent: "space-between",
              }}
            >
              <ItemImage
                onImagePress={() => {
                  Navigation.navigate("product", { item: parsedElement });
                }}
                image={parsedElement.image}
                ContentContainerStyle={{
                  height: SIZES.width / 4,
                  width: SIZES.width / 4,
                }}
              />
              <View>
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
                  {parsedElement.title}
                </Text>

                <RenderTable lable={"Quantity"} name={parsedElement.quantity} />
                <RenderTable
                  lable={"price:"}
                  name={formatCurrency(
                    parsedElement.price * parsedElement.quantity
                  )}
                  namestyle={{
                    color: COLORS.success,
                    ...FONTS.h4,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
});

const RenderTable = ({ lable, name, lableStyle, namestyle }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
      }}
    >
      <Text style={{ ...FONTS.h5, color: COLORS.grey, ...lableStyle }}>
        {lable}
      </Text>
      <Text style={{ ...FONTS.body5, ...namestyle }}>{name}</Text>
    </View>
  );
};

export default ClientComponent;

const styles = StyleSheet.create({});
