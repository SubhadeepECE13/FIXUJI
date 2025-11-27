interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface DateDetails {
  date: number;
  month: string;
  year: number;
  time: string;
  day: string;
  full_date: string;
}

interface Location {
  latitude: number;
  longitude: number;
}
interface chargesDetails {
  charge_amount: number;
  charge_type: string;
}
interface Address {
  address_type: string;
  id: string;
  full_address: string;
}

interface Distance {
  unit: "meter" | string;
  distance: number;
}

interface TimeDifference {
  hours: number;
  minuites: number;
}

interface ServiceVariant {
  default: boolean;
  display_price: number;
  actual_price: number;
  vehicle_type: string;
  sort_order: number;
}

interface Addon {
  forEach(arg0: (item: any) => void): unknown;
  reduce(arg0: (sum: any, a: any) => any, arg1: number): unknown;
  length: number;
  addon_name: string;
  addon_img: string;
  display_price: number;
  actual_price: number;
  addon_type: string;
  addon_desc: string;
  vehicle_type: string;
  sort_order: number;
  id: number;
}

interface ServiceDetails {
  color: string;
  addons: Addon;
  description: string;
  active: boolean;
  app_display: boolean;
  electricity_charges: number;
  type: string;
  name: string | null;
  variant: ServiceVariant[];
  captureImageList: string[];
  details: string[];
  capturImageList: string[];
  serviceId: string;
  sort_order: number;
  disclaimer: string[];
}

interface CustomerData {
  customer_zone: string;
  phoneNumber: string;
  displayName: string;
  customer_source: string;
  navigateAddressLink: string;
}

interface VehicleInfo {
  model: string;
  type: string;
  brand: string;
  numberPlate: string;
}

interface VendorInfo {
  vendor_name: string;
  vendor_img: string;
  vendor_description: string;
}

interface StaffMember {
  role: string;
  vendor_id: string;
  name: string;
}

interface OrderHistoryRecord {
  date: DateDetails;
  userData: CustomerData;
  isAppBooking: string;
  addons: Addon;
  discount: number;
  vendorId: string;
  vehicle: VehicleInfo;
  customer_zone: string;
  total: number;
  service_date: string;
  vendor: VendorInfo;
  referralCode: string;
  variant: ServiceVariant;
  customer_source: string;
  department: string;
  lastUpdatedDate: Timestamp;
  createdDate: Timestamp;
  serviceMode: "DOORSTEP" | string;
  user_id: string;
  createdBy: string;
  service: ServiceDetails;
  captureImageList: string[];
  bookingDate: Timestamp;
  location: Address;
  couponCode: string;
  order_id: string;
  vendorCharges: number;
  status: string;

  startTime?: Timestamp;
  reachedTime?: Timestamp;
  staff?: StaffMember[];
  reachedLocation?: Location;
  tart_order_image?: string;
  timeDifference?: TimeDifference;
  history?: string;
}

export interface AddonVariant {
  duration: number;
  display_price: number;
  actual_price: number;
  vehicle_type: string;
}

export interface SuggestedAddons {
  id: string;
  addon_name: string;
  addon_img: string;
  addon_type: string;
  addon_desc: string;
  sort_order?: number;
  commission: number;
  recommended?: boolean;
  service_pack: string[];
  variant: AddonVariant[];
}

export interface ServiceBooking {
  data: {
    id: string;
    service_name: string;
    orderDocId: string;
    service_color: string;
    orderTimeStampts: {
      created: Timestamp;
      updated: Timestamp;
    };
    advancePayment?: {
      paymentMode: String;
      paymentDate: String;
      advanceAmount: Number;
    };

    date: DateDetails;
    tart_order_image: string;
    userData: CustomerData;
    isAppBooking: string;
    distance: Distance;
    addons: Addon[];
    discount: number;
    charges: chargesDetails[];
    vendorId: string;
    vehicle: VehicleInfo;
    customer_zone: string;
    total: number;
    startLocation: Location;
    service_date: string;
    vendor: VendorInfo;
    referralCode: string;
    variant: ServiceVariant;
    customer_source: string;
    startTime: string;
    timeDifference: TimeDifference;
    department: string;
    reachedTime: Timestamp;
    staff: StaffMember[];
    history: OrderHistoryRecord[];
    reachedLocation: Location;
    lastUpdatedDate: Timestamp;
    createdDate: Timestamp;
    serviceMode: "DOORSTEP" | string;
    user_id: string;
    createdBy: string;
    service: ServiceDetails;
    captureImageList: string[];
    bookingDate: Timestamp;
    location: Address;
    endTime: Timestamp;
    couponCode: string;
    order_id: string;
    vendorCharges: number;
    status: string;
    eta: number;
    suggestedAddons?: SuggestedAddons[];
  };
}
