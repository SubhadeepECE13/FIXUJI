import TabView from "@/components/common/TabView";
import OrderCard from "@/components/order/OrderCard";
import { ORDERS_SCREEN_TABS } from "@/configs/constants";
import useDebounce from "@/hooks/useDebounce";
import { getAllOrders } from "@/store/actions/orders/OrderAction";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { RootState } from "@/store/Store";
import { windowHeight } from "@/themes/Constants.themes";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function OrdersScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const isMounted = useRef(false);
  const debouncedSearchText = useDebounce(searchText, 500);
  const dispatch = useAppDispatch();
  const { isOrderEnd } = useAppSelector((state) => state.order);
  const userCity = useAppSelector(
    (state) => state.user.user?.department || "city not selected in first time "
  );
  const isOwnOrder = useAppSelector(
    (state: RootState) => state.order.isOwnOrder
  );
  const orders = useAppSelector((state: RootState) => state.order.orders);

  const userObject = useAppSelector((state) => state.user.user);
  console.log("user object is:", userObject);
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    if (isOwnOrder && userObject) {
      return orders.filter((o) => o.vendorId === userObject.id);
    }
    return orders;
  }, [orders, isOwnOrder, userObject]);

  const settings = useAppSelector((state: RootState) => state.settings.data);
  const renderPartyItem = useCallback(
    ({ item }: { item: Order }) => {
      if (!userObject || !settings) {
        return <></>;
      }

      return (
        <OrderCard
          vendor={item}
          userData={item}
          user={userObject}
          Order={item}
          settings={settings}
        />
      );
    },
    [userObject, settings]
  );

  const handleTabChange = useCallback((index: number) => {
    setLoader(true);
    setSelectedIndex(index);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    await fetchOrders();
    setRefresh(false);
  };

  const fetchOrders = async () => {
    const firstPage = 1;
    setLoader(true);
    try {
      await dispatch(
        getAllOrders({
          city: userCity,
          limit: 10,
          page: firstPage,
          search: debouncedSearchText,
          status: ORDERS_SCREEN_TABS[selectedIndex].status,
          operand: ORDERS_SCREEN_TABS[selectedIndex].operand,
        })
      );
      setPage(firstPage + 1);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  console.log("usercity", userCity);

  const fetchMoreData = async () => {
    const firstPage = 1;
    if (isOrderEnd || loadingMore) return;
    setLoadingMore(true);
    try {
      await dispatch(
        getAllOrders({
          city: userCity,
          limit: 10,
          page: page,
          search: debouncedSearchText,
          status: ORDERS_SCREEN_TABS[selectedIndex].status,
          operand: ORDERS_SCREEN_TABS[selectedIndex].operand,
        })
      );

      setPage((prev) => prev + 1);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearchText, selectedIndex, dispatch]);

  return (
    <TabView
      headerProps={{
        isBack: true,
        title: "Bookings",
        isRightIcon: false,
      }}
      selectedIndex={selectedIndex}
      handleTabChange={handleTabChange}
      tabItems={ORDERS_SCREEN_TABS}
      loader={loader}
      refresh={refresh}
      onRefresh={onRefresh}
      items={filteredOrders}
      renderItem={renderPartyItem}
      skeletonDHeight={windowHeight(30)}
      skeletonLength={3}
      fetchMoreData={fetchMoreData}
      isListEnd={isOrderEnd}
    />
  );
}
