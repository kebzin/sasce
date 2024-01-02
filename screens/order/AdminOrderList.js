import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import AdminRenderComponent from "./AdminRenderComponent";
import { SIZES, FONTS, COLORS } from "../../constants";
import { TextButton } from "../../components/common";

const AdminOrderList = ({
  orders,
  handleOnEndReach,
  MarkAsProcessing,
  featchOrders,
}) => {
  const [loading, setLoadin] = useState(false);

  const Processing = async (id, statuss) => {
    setLoadin(true);
    try {
      await MarkAsProcessing(id, statuss);
      setLoadin(false);
    } catch (error) {
      console.log("Error in processing", error);
    } finally {
      setLoadin(false);
    }
  };
  return (
    <View>
      <Text
        style={{ textAlign: "center", ...FONTS.h2, paddingTop: SIZES.base }}
      >
        Recent Orders
      </Text>
      {loading && <ActivityIndicator size="large" style={{}} />}
      <FlatList
        ListEmptyComponent={
          <View>
            <Text style={{ ...FONTS.body3, marginVertical: SIZES.base * 4 }}>
              No Order Yet
            </Text>
            {/* render a button to refresh */}

            <TextButton
              onPress={featchOrders}
              label={"Refresh"}
              labelStyle={{
                ...FONTS.body5,
              }}
              contentContainerStyle={{
                height: 40,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.success,
              }}
            />
          </View>
        }
        // refreshing={refreshing}
        onEndReached={handleOnEndReach}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooter}
        fadingEdgeLength={1}
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <AdminRenderComponent Processing={Processing} item={item} />;
        }}
        initialNumToRender={10}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding - 10,
          rowGap: 20,
          marginTop: 15,
        }}
        // onScroll={handleScroll}
      />
    </View>
  );
};

export default AdminOrderList;

const styles = StyleSheet.create({});
