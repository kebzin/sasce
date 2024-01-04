import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SIZES, FONTS, COLORS } from "../../constants";
import { CheckBox, InputField, TextButton } from "../../components/common";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAuth } from "../../hook/useAuth";
import { useData } from "../../hook/useData";
import { supabase } from "../../lib/superbase";
import { formatCurrency } from "../../lib/Helpers/TimeAgo";
import { reset } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';
const CheckOut = ({ route, navigation }) => {
  const { check, shippingCost } = route.params;
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
  const [isLoading, setIsLoading] = useState(false);
  const [Payment, SetPayment] = useState("Local pickup");

  //price calculation
  const quantity = card?.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = card?.reduce((acc, item) => acc + item.price, 0);
  // const shippingCharge = 300;

  // handle submit
  const handleSubmit = async () => {
    // Add your logic here for handling the form submission
    setIsLoading(true);
    try {
      for (let key in componentState) {
        if (!componentState[key]) {
          setIsLoading(false);
          return alert(`${key} field: cannot be left blank`);
        }

        // store the data to the superbase
      }
      const formdata = {
        firstname: componentState.FirstName,
        lastname: componentState.LastName,
        countery_region: componentState.CounteryOrRegion,
        streetaddress: componentState.StreetAddress,
        town_city: componentState.Town_City,
        state_country: componentState.State_Coutery,
        postcode_zip: componentState.PostalCode,
        phone: componentState.PhoneNumber,
        email: componentState.EmailAddress,
        oders: card,
        paymentmethod: Payment,
        user: session?.user.id,
        deriverytype: check,
        shippingfee: shippingCost,
        shippingtype:
          check === "Nagaw delivery company"
            ? "Nagaw delivery company"
            : "Local Delivery",
        totalprice:
          check === "Nagaw delivery company" ? totalPrice + 300 : totalPrice,
      };

      if (Payment === "") {
        return alert("Please choose the payment method you prefere");
      }
      // store to superbase
      // store the data to the superbase
      const { data, error } = await supabase.from("order").insert(formdata);

      if (error) {
        setIsLoading(false);
        return alert(error.message);
      }
      alert("Order submitted successfully!. we will soon get back to you");
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
    style={{ display: "flex", gap: 5, paddingHorizontal: SIZES.base }}
  >
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
        

   
        </TouchableWithoutFeedback>
      </View>
  
     
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
                <Text style={styles.shippingInfoPrice}>
                  {formatCurrency(item?.price)}
                </Text>
              </View>
            </View>
          ))}
          <View style={{ paddingTop: SIZES.padding }}>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Deleivery type</Text>
              <Text style={styles.subtitledetails}>{check}</Text>
            </View>

            {/* payment option */}
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.primary,
                paddingVertical: SIZES.base,
              }}
            >
              Choose Payment Method
            </Text>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.shippingInfoTitle}>Bank Transfer</Text>

              <CheckBox
                isSelected={Payment === "Bank Transfer" ? true : false}
                Onpress={() => SetPayment("Bank Transfer")}
              />
           
             
             
            </View>
            <Text style={styles.shippingInfoPrice}>Bank Name : ECOBANK(GAMBIA)</Text>
            <Text style={styles.shippingInfoPrice}>Account Name: SAACS TAILORING ENTERPRISE </Text>
              <Text style={styles.shippingInfoPrice}>Account Number: 6240024479</Text>
              <Text style={styles.shippingInfoPrice}>BIC/Swift : CITIUS33</Text>
     

      
            <View style={styles.shippingInfoItem}>
              <Text style={styles.shippingInfoTitle}>Cash on delivery</Text>
              <CheckBox
                isSelected={Payment === "Cash on delivery" ? true : false}
                Onpress={() => SetPayment("Cash on delivery")}
              />
            </View>
      

            {check === "Bank Transfer" && (
              <View style={{ paddingVertical: SIZES.padding }}>
                <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                  Bank details
                </Text>

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
                    color: COLORS.grey,
                    paddingTop: 10,
                  }}
                >
                  Note: Please Make your payment directly into our bank account.
                  Your order will not be shipped until the funds have cleared in
                  our account. Send the screenshot of the patment to this number
                  20231227
                </Text>
              </View>
            )}

            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
                paddingVertical: SIZES.base,
              }}
            >
              Pricing
            </Text>

            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Shipping</Text>
              <Text style={styles.subtitledetails}>
                {formatCurrency(shippingCost)}
              </Text>
            </View>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}>Sub Total</Text>
              <Text style={styles.subtitledetails}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
            <View style={styles.shippingInfoItem}>
              <Text style={styles.sumtitle}> Total</Text>
              <Text style={styles.subtitledetails}>
                {formatCurrency(totalPrice + shippingCost)}
              </Text>
            </View>
          </View>

          <TextButton
            prependContainer={
              isLoading && <ActivityIndicator size={"large"} color={"#ffff"} />
            }
            disabled={isLoading}
            onPress={handleSubmit}
            label={"Checkout"}
            labelStyle={styles.checkoutButtonLabel}
            contentContainerStyle={styles.checkoutButton}
          />
          
        </View>

    </View>
    </ScrollView>
  );
};
{
}
export default CheckOut;

const styles = StyleSheet.create({
  checkBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
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
 
    top: 15,
    left: 0,
    right: 0,
    paddingVertical: SIZES.padding,
    flex: 1,
    borderTopRightRadius: SIZES.radius + 15,
    borderTopLeftRadius: SIZES.radius + 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    paddingHorizontal: SIZES.padding,
    shadowOpacity: 3.25,
    shadowRadius: 3.84,
    elevation: 10,
    flexDirection: "column",
    paddingBottom: 100,
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
