import { StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import ItemImage from "../Home/ItemImage";
import { COLORS, SIZES, FONTS } from "../../constants";
import { formatCurrency, timeAgo } from "../../lib/Helpers/TimeAgo";
import { useNavigation } from "@react-navigation/native";
import { TextButton } from "../../components/common";
import Popup from "../../components/common/Popup";

const AdminRenderComponent = memo(({ item, Processing }) => {
  const Navigation = useNavigation();
  const fullTime = timeAgo(item?.created_at);
  const [popup, setpopup] = useState(false);
  const [popupmessage, setpopupmessage] = useState();
  const [statusmessage, setstatusMessage] = useState("");
  const [complete, setComplete] = useState(false);

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

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextButton
          onPress={() => {
            setpopupmessage(
              "By confirming this transaction will be in the processing stage. Are you sure you want to proceed?"
            ),
              setstatusMessage("Processing");

            setpopup(true);
          }}
          label={"Mark as processing"}
          labelStyle={{
            ...FONTS.body5,
          }}
          contentContainerStyle={{
            height: 40,
            borderRadius: SIZES.radius,
            marginTop: 10,
            backgroundColor: COLORS.success,
            flex: 1,
          }}
        />

        <TextButton
          onPress={() => {
            setpopupmessage(
              "Confirming completion indicates that the transaction has been fully processed. Are you sure you want to proceed?"
            ),
              setstatusMessage("Complet"),
              setpopup(true);
          }}
          label={"Mark as Compleat"}
          labelStyle={{
            ...FONTS.body5,
          }}
          contentContainerStyle={{
            height: 40,
            borderRadius: SIZES.radius,
            marginTop: 10,
            backgroundColor: COLORS.success,
            flex: 1,
          }}
        />
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
                <Text
                  style={{
                    color: COLORS.success,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  {formatCurrency(parsedElement.price)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      {popup && (
        <Popup
          openModal={popup}
          setShowModal={setpopup}
          Onclose={() => setpopup((prev) => !prev)}
          // height={SIZES.height / 4}
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
                Confirm
              </Text>
              <Text
                style={{
                  ...FONTS.body5,
                  lineHeight: 19,
                  color: COLORS.dark60,
                  paddingVertical: SIZES.base,
                  textAlign: "center",
                }}
              >
                {popupmessage}
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
                  label={"Continue"}
                  contentContainerStyle={{
                    flex: 1,
                    height: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.success,
                    marginRight: SIZES.base,
                  }}
                  onPress={() => {
                    Processing(item.id, (statuss = statusmessage));
                    setpopup(false);
                  }}
                  labelStyle={{ ...FONTS.body5, color: COLORS.light }}
                />
                <TextButton
                  onPress={() => setpopup(false)}
                  label={"Cancel"}
                  contentContainerStyle={{
                    flex: 1,
                    height: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.error,
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

export default AdminRenderComponent;

const styles = StyleSheet.create({});
