import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AdminOrderList from "./AdminOrderList";
import ClientOrderList from "./ClientOrderList";
import { supabase } from "../../lib/superbase";
import { COLORS } from "../../constants";
import { useAuth } from "../../hook/useAuth";

const OrderList = () => {
  // fet order data from the superbase
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);
  const { session } = useAuth();

  const featchOrders = async () => {
    setLoading(true);
    try {
      if (session.user.email === "kebbawaiga@gmail.com") {
        const { data, error } = await supabase
          .from("order")
          .select("*")
          .order("created_at", { ascending: false, nullsFirst: false })
          .range(orders.length, orders.length + 1 * orders.length + pageSize)
          .limit(pageSize);

        if (error) {
          setLoading(false);
          setIsError(true);
          console.log("error", error);
          setError(error.message);
          return;
        }

        setOrders(data || []);
        return;
      }
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false })
        .range(orders.length, orders.length + 1 * orders.length + pageSize)
        .limit(pageSize)
        .eq("user", session.user.id);

      if (error) {
        setLoading(false);
        setIsError(true);
        console.log("error", error);
        setError(error.message);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset the data fetching flag
    }
  };

  useEffect(() => {
    featchOrders();
  }, [pageSize, MarkAsProcessing]);

  const MarkAsProcessing = async (id, statuss) => {
    try {
      const { data, error } = await supabase
        .from("order")
        .update({ status: statuss })
        .eq("id", id);
      if (error) {
        alert(error);
        return;
      }

      alert("successfully marked");
    } catch (error) {
      console.log(error.message);
    }
  };

  // .update({ other_column: 'otherValue' })
  // .eq('some_column', 'someValue')

  const handleOnEndReach = async () => {
    await featchOrders();
  };

  return (
    <View style={{ backgroundColor: COLORS.grey08, flex: 1 }}>
      {/* render base on the login status */}
      {session.user.email === "kebbawaiga@gmail.com" ? (
        <AdminOrderList
          MarkAsProcessing={MarkAsProcessing}
          handleOnEndReach={handleOnEndReach}
          featchOrders={featchOrders}
          orders={orders}
        />
      ) : (
        <ClientOrderList orders={orders} />
      )}
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color={COLORS.success} />
          <Text style={{ textAlign: "center" }}>Loading data ...</Text>
        </View>
      )}
      {isError && <Text>{error}</Text>}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
