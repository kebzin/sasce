import React, { useState } from "react";
import { FONTS, COLORS, SIZES, icons } from "../../constants/index";
import {
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { TextButton, InputField } from "../../components/common/index";
import { supabase } from "../../lib/superbase";
import { ActivityIndicator } from "react-native";
// import BottomSheetEmptyView from "../../components/bottomsheetcomponent/BottomSheetEmptyView";
import { StatusBar } from "expo-status-bar";
const Login = ({ navigation }) => {
  // State for phone number
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  // Function to dismiss keyboard
  const handleKeyboard = (navigation) => {
    Keyboard.dismiss();
  };
  // const resetPasswordURL = Linking.createURL("ChangePassword");
  const HandlePaswordReset = async () => {
    try {
      setIsloading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: password,
      });
      if (error) {
        alert(error.message);
        return setIsloading(false);
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      setIsloading(false);

      console.log("error", error.message);
    } finally {
      setIsloading(false);
    }
  };
  const canSave = Boolean(Email) && Boolean(password);

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}>Sign In</Text>

        <InputField
          containerStyle={styles.inputContainer}
          Placeholder={"Email"}
          onChange={(text) => setEmail(text)}
          value={Email}
          enterKeyHint={"done"}
          inputMode={"email"}
          prependComponent={<Image source={icons.email} style={styles.icon} />}
        />
        <InputField
          containerStyle={{
            marginTop: SIZES.base + 5,
          }}
          Placeholder={"Password"}
          onChange={(text) => setPassword(text)}
          value={password}
          enterKeyHint={"done"}
          prependComponent={<Image source={icons.lock} style={styles.icon} />}
        />
        <TextButton
          disabled={!canSave}
          prependContainer={
            isLoading && (
              <ActivityIndicator
                size="small"
                color={COLORS.light}
                style={styles.loadingIndicator}
              />
            )
          }
          onPress={HandlePaswordReset}
          label={"LoggIn"}
          contentContainerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
        />
        <TextButton
          onPress={() => navigation.navigate("register")}
          contentContainerStyle={{
            backgroundColor: null,
            paddingVertical: SIZES.padding,
          }}
          label={"Dont't have an account "}
          labelStyle={{
            ...FONTS.body5,
            color: COLORS.success,
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
  },
  heading: {
    ...FONTS.h2,
    marginBottom: SIZES.base,
    textAlign: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: SIZES.base,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 30,
  },
  buttonContainer: {
    height: 55,
    borderRadius: SIZES.radius,
    marginTop: 20,
    backgroundColor: COLORS.success,
  },
  buttonLabel: {
    ...FONTS.h5,
    color: COLORS.light,
  },
});

export default Login;

//We’ve sent the password reset instructions to your email if it has been registered with us.
