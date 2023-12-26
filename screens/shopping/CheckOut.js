import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SIZES, FONTS, COLORS } from "../../constants";
import { InputField, TextButton } from "../../components/common";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAuth } from "../../hook/useAuth";
import { useData } from "../../hook/useData";

const CheckOut = ({ route }) => {
  const { check, shipping } = route.params;
  const { session } = useAuth();
  const { card, setCard } = useData();

  // const [check, setCheck] = useState(false);
  const [componentState, setComponentState] = useState({
    FirstName: "",
    LastName: "",
    CounteryOrRegion: "",
    StreetAddress: "",
    Town_City: "",
    State_Coutery: "",
    PostalCode: "",
    PhoneNumber: "",
    EmailAddress: "",
  });

  //price calculation
  const quantity = card?.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = card?.reduce((acc, item) => acc + item.price, 0);
  // const shippingCharge = 300;
  const total = totalPrice;

  // handle submit
  const handleSubmit = () => {
    // Add your logic here for handling the form submission
    for (let key in componentState) {
      if (!componentState[key]) {
        return alert(`${key} field: cannot be left blank`);
      }
    }
  };
  // Add the following prop to the TextButton component:
  // onPress={handleSubmit}

  // handle submit to the database
  // handleSubmit

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 2 }}>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={{ overflow: "scroll" }}
        >
          <Text style={{ paddingVertical: SIZES.padding }}>
            Please enter you detail to continue
          </Text>

          <ScrollView style={{ display: "flex", gap: 5 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>First Name (require)</Text>
                <InputField
                  inputContainerStyle={{
                    height: 40,
                    borderRadius: SIZES.base,
                  }}
                  value={componentState.FirstName}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      FirstName: text,
                    }))
                  }
                  Placeholder={"First Name"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>Last Name (require)</Text>
                <InputField
                  inputContainerStyle={{
                    height: 40,
                    borderRadius: SIZES.base,
                  }}
                  value={componentState.LastName}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      LastName: text,
                    }))
                  }
                  Placeholder={"Last Name "}
                />
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
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>
                  Countery / Region (require)
                </Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  value={componentState.CounteryOrRegion}
                  Placeholder={"Enter Countery or region"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      CounteryOrRegion: text,
                    }))
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>Street address (require) </Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  value={componentState.StreetAddress}
                  Placeholder={"Your Street address"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      StreetAddress: text,
                    }))
                  }
                />
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
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>Town / City (require)</Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  value={componentState.Town_City}
                  Placeholder={"Your Town or City"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      Town_City: text,
                    }))
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>State / County (require)</Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  value={componentState.State_Coutery}
                  Placeholder={"Your State / County"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      State_Coutery: text,
                    }))
                  }
                />
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
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>Postcode / ZIP (require)</Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  value={componentState.PostalCode}
                  Placeholder={"Postcode / ZIP"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      PostalCode: text,
                    }))
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputText}>Phone number (require)</Text>
                <InputField
                  inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                  keyboardType="phone-pad"
                  value={componentState.PhoneNumber}
                  inputMode={"numeric"}
                  Placeholder={"Enter Phone number"}
                  onChange={(text) =>
                    setComponentState((previouse) => ({
                      ...previouse,
                      PhoneNumber: text,
                    }))
                  }
                />
              </View>
            </View>

            <View style={{}}>
              <Text style={styles.inputText}>
                Enter email address (require)
              </Text>
              <InputField
                inputContainerStyle={{ height: 40, borderRadius: SIZES.base }}
                value={componentState.EmailAddress}
                inputMode={"email"}
                Placeholder={"Email address"}
                onChange={(text) =>
                  setComponentState((previouse) => ({
                    ...previouse,
                    EmailAddress: text,
                  }))
                }
              />
            </View>
          </ScrollView>

          {/* <TextButton
          onPress={handleSubmit}
          label={"Checkout"}
          labelStyle={styles.checkoutButtonLabel}
          contentContainerStyle={styles.checkoutButton}
        /> */}
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        style={{ flex: 1.5, overflow: "scroll" }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.shippingInfoContainer}>
          <View>
            <Text>
              <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                Your order
              </Text>
            </Text>
          </View>
          <View style={styles.shippingInfoItem}>
            <Text style={styles.shippingInfoTitle}>Number of items</Text>
            <Text style={styles.shippingInfoPrice}>{quantity}</Text>
          </View>
          {card?.map((item) => (
            <View key={item.id}>
              <View style={styles.shippingInfoItem}>
                <Text style={styles.shippingInfoTitle}>{item?.title}</Text>
                <Text style={{ ...FONTS.body5 }}>Q{item?.quantity}</Text>
                <Text style={styles.shippingInfoPrice}>GMD {item?.price}</Text>
              </View>
            </View>
          ))}
          <View style={{ paddingTop: SIZES.padding }}>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Deleivery type</Text>
              <Text style={styles.subtitledetails}>
                {check ? " Nagaw delivery company" : "Local pickup"}
              </Text>
            </View>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Shipping</Text>
              <Text style={styles.subtitledetails}>{shipping}</Text>
            </View>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Sub Total</Text>
              <Text style={styles.subtitledetails}>
                GMD {check ? totalPrice + 300 : totalPrice}
              </Text>
            </View>
          </View>

          <TextButton
            // onPress={handleCheckoutProcceed}
            label={"Checkout"}
            labelStyle={styles.checkoutButtonLabel}
            contentContainerStyle={styles.checkoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};
{
}
export default CheckOut;

const styles = StyleSheet.create({
  inputText: {
    ...FONTS.body5,
    color: COLORS.dark60,
  },
  sumtitle: {
    ...FONTS.h5,
    color: COLORS.grey,
  },
  subtitledetails: {
    ...FONTS.h5,
    color: COLORS.grey,
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
    ...FONTS.h5,
    color: COLORS.dark60,
  },
});
