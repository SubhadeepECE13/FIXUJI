interface Vendor {
  vendor_name: string;
  vendor_img: string;
  vendor_description: string;
}

interface Variant {
  default: boolean;
  display_price: number;
  actual_price: number;
  vehicle_type: string;
  sort_order: number;
}

interface Location {
  address_type: string;
  id: string;
  full_address: string;
}

interface UserData {
  customer_zone: string;
  phoneNumber: string;
  displayName: string;
  customer_source: string;
  navigateAddressLink: string;
}

interface DateInfo {
  date: number;
  month: string;
  year: number;
  time: string;
  day: string;
  full_date: string;
}

interface OrderTimeStamp {
  _seconds: number;
  _nanoseconds: number;
}

interface Order {
  id: string;
  service_name: string;
  vendorId: string;
  customer_zone: string;
  orderDocId: string;
  vendor: Vendor;
  variant: Variant;
  location: Location;
  service_color: string;
  department: string;
  order_id: string;
  userData: UserData;
  date: DateInfo;
  orderTimeStamp: OrderTimeStamp;
  status: string;
}

interface GetAllOrders {
  data: Order[];
}
