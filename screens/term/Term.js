import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES, FONTS } from "../../constants";

const Term = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: SIZES.padding - 10,
        paddingVertical: SIZES.padding,
        marginBottom: SIZES.padding,
      }}
    >
      <Text style={styles.titleStyle}>Read The Private Policies</Text>
      <Text style={styles.textStyle}>
        At SAACS, we are committed to safeguarding the privacy of our customers
        and app users. This E-commerce Privacy Policy outlines the types of
        personal information we collect, how we use it, and the steps we take to
        ensure your information is kept secure.
      </Text>

      <Text style={styles.titleStyle}> Personal Information We Collect</Text>
      <Text style={styles.textStyle}>
        When you use our app, we may collect personal information such as your
        name, email address, phone number, and shipping address. We may also
        collect information about your product preferences and purchase history.
        This information is utilized to provide you with the best shopping
        experience, including personalized product recommendations and updates
        on new arrivals. Additionally, we may gather data on your app usage and
        interactions for analysis and service improvement.
      </Text>

      <Text style={styles.titleStyle}> How We Use Your Personal</Text>
      <Text style={styles.textStyle}>
        Your personal information is employed to enhance your shopping
        experience, including personalized product recommendations and updates
        on new arrivals. We may also use your information to communicate with
        you regarding your orders or to send you promotional materials and
        exclusive offers. Internal research and analysis are conducted to
        improve our services and app.
      </Text>
      <Text style={styles.textStyle}>
        We do not share or sell your personal information to any third parties,
        except as required by law or with your explicit consent. We take
        measures to ensure that your information is kept secure and only shared
        with trusted third parties for the purpose of providing our services.
      </Text>

      <Text style={styles.titleStyle}> Security Measures</Text>
      <Text style={styles.textStyle}>
        We prioritize the security of your personal information and have
        implemented various measures to protect it from unauthorized access.
        Industry-standard encryption techniques are employed during data
        transmission, and your information is stored on secure servers protected
        by firewalls and other security measures. Regular reviews and updates to
        our security systems are conducted to ensure effectiveness.
      </Text>

      <Text style={styles.titleStyle}>
        Accessing and Updating Your Personal Information
      </Text>
      <Text style={styles.textStyle}>
        You have the right to access and update your personal information at any
        time. Log into your account on our app or contact us directly to
        exercise this right. Additionally, you can request the deletion of your
        personal information, and we will comply unless legally required to
        retain it.
      </Text>

      <Text style={styles.titleStyle}>Cookies and Tracking Technologies </Text>
      <Text style={styles.textStyle}>
        We use cookies and tracking technologies to improve your app experience
        and understand how you interact with our services. Cookies are small
        data files stored on your device to recognize your preferences and
        settings. Third-party analytics tools are also utilized to comprehend
        app usage and enhance our services. We do not share or sell this
        information to third parties, except as required by law or with your
        explicit consent.
      </Text>

      <Text style={styles.titleStyle}>Contact Us </Text>
      <Text style={styles.textStyle}>
        If you have any questions or concerns about our E-commerce Terms and
        Policies or how we handle your personal information, please contact us.
        By using our app and services, you consent to the collection, use, and
        sharing of your personal information as described in these policies. If
        you do not agree with the terms, please refrain from using our app.
      </Text>
    </ScrollView>
  );
};

export default Term;

const styles = StyleSheet.create({
  titleStyle: {
    ...FONTS.h3,
    paddingVertical: SIZES.base,
  },
  textStyle: {
    marginTop: SIZES.base * 2,
    ...FONTS.body5,
  },
});
