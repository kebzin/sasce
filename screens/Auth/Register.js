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
const Register = ({ navigation }) => {
  // State for phone number
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [confirm, setConfirm] = useState("");
  // Function to dismiss keyboard
  const canSave = Boolean(Email) && Boolean(password) && Boolean(confirm);

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  // const resetPasswordURL = Linking.createURL("ChangePassword");
  const HandlePaswordReset = async () => {
    try {
      setIsloading(true);
      if (password !== confirm) {
        return alert("password is not match");
      }
      if (!canSave) {
        return alert("All the fiels are required");
      }
      const { data, error } = await supabase.auth.signUp({
        email: Email,
        password: password,
      });
      if (error) {
        alert(error.message);
        return setIsloading(false);
      }
      navigation.navigate("login");
    } catch (error) {
      setIsloading(false);

      console.log("error", error.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}>Create Account</Text>

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
        <InputField
          containerStyle={{
            marginTop: SIZES.base + 5,
          }}
          Placeholder={"Confirm Password "}
          onChange={(text) => setConfirm(text)}
          value={confirm}
          enterKeyHint={"done"}
          prependComponent={<Image source={icons.lock} style={styles.icon} />}
        />
        <TextButton
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
          label={"Sign up"}
          contentContainerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
        />

        <TextButton
          onPress={() => navigation.navigate("login")}
          contentContainerStyle={{
            backgroundColor: null,
            paddingVertical: SIZES.padding,
          }}
          label={"already have an account "}
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

export default Register;

//We’ve sent the password reset instructions to your email if it has been registered with us.
