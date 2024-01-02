import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextButton } from "../../components/common";
import { COLORS, SIZES } from "../../constants";

const Account = () => {
  return (
    <View style={{ paddingHorizontal: SIZES.padding }}>
      <Text>Account Details</Text>
      <Text>Email: </Text>
      <Text style={styles.email}>Join At</Text>

      <TextButton
        label={"Delete Account"}
        contentContainerStyle={{
          height: 55,
          backgroundColor: COLORS.error,
          borderRadius: SIZES.radius,
          marginTop: SIZES.padding,
        }}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
