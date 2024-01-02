import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS } from "../../constants";
import { TextButton } from "../../components/common";
import ClientComponent from "./ClientComponent";

const ClientOrderList = ({ orders, handleOnEndReach, featchOrders }) => {
  return (
    <View>
      <Text
        style={{ textAlign: "center", ...FONTS.h2, paddingTop: SIZES.base }}
      >
        My Recent Orders
      </Text>
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
          return <ClientComponent item={item} />;
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

export default ClientOrderList;

const styles = StyleSheet.create({});
