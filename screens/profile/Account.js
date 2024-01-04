import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextButton } from "../../components/common";
import { COLORS, SIZES, FONTS } from "../../constants";
import { useAuth } from "../../hook/useAuth";
import { timeAgo } from "../../lib/Helpers/TimeAgo";
import Popup from "../../components/common/Popup";
import { supabase } from "../../lib/superbase";

const Account = () => {
  const [popup, setpopup] = useState(false);
  const [loading, setoading] = useState(false);

  // handle account delete
  const handleAccountDelete = async () => {
    try {
      const { data, error } = supabase
        .from("user")
        .delete()
        .eq("id", session.user.id);

      // handle an error when one occured

      if (error) {
        // tell the user that something wen wring
        alert(error.message);
      }
    } catch (error) {
      // print out the erro message
      console.log(error.message);
    }
  };

  const { session } = useAuth();
  console.log(session);
  return (
    <View style={{ paddingHorizontal: SIZES.padding }}>
      <Text style={{ ...FONTS.body2, textAlign: "center" }}>
        Account Details
      </Text>
      <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Email: </Text>
      <Text style={{ ...FONTS.body4, color: COLORS.dark }}>
        {session?.user.email}
      </Text>
      <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Join At: </Text>

      <Text style={styles.email}>{timeAgo(session.user.created_at)}</Text>

      <TextButton
        onPress={() => setpopup(true)}
        label={"Delete Account"}
        contentContainerStyle={{
          height: 55,
          backgroundColor: COLORS.error,
          borderRadius: SIZES.radius,
          marginTop: SIZES.padding,
        }}
      />

      {popup && (
        <Popup
          openModal={popup}
          setShowModal={setpopup}
          height={SIZES.height / 3}
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
                Deleting Account
              </Text>
              <Text
                style={{
                  ...FONTS.body5,
                  lineHeight: 19,
                  color: COLORS.dark60,
                  paddingVertical: SIZES.base,
                }}
              >
                If you choosed to delete your account instate , you wont be able
                to recover it, All the content related to your account will be
                deleted permanently
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
                  label={"Delete Account"}
                  contentContainerStyle={{
                    borderRadius: SIZES.radius - 3,
                    height: 50,
                    flex: 1,
                    backgroundColor: COLORS.error,
                  }}
                />
                <TextButton
                  onPress={() => setpopup(false)}
                  label={"Cancel"}
                  contentContainerStyle={{
                    margin: SIZES.padding,
                    backgroundColor: null,
                  }}
                />
              </View>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
