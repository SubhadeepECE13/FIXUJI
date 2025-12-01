import { NavigationTabProps } from "@/@types/global";
import { TabItem } from "@/components/common/AnimatedTabs";

import Images from "@/utils/images";

export const DashBoardNavigationTab: NavigationTabProps[] = [
  {
    title: "Bookings",
    image: Images.Orders,
    route: "/(routes)/orders",
  },
];

export const ORDERS_SCREEN_TABS: TabItem[] = [
  {
    iconType: "FontAwesome",
    iconName: "address-book",
    label: "ASSIGNED",
    status: "ASSIGNED,RESCHEDULED,REASSIGNED,ON_THE_WAY,REACHED,IN_PROGRESS",
    operand: "EQ",
    filterText: "",
  },
  {
    iconType: "Fontisto",
    iconName: "atom",
    label: "COMPLETED",
    status: "COMPLETED",
    operand: "EQ  ",
    filterText: "",
  },
];
export const IVR_NUMBER = "8697771777";
