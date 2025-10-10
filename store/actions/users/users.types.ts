export interface IFeatureFlag {
  update_service_flag: boolean;
  click_image_flag: boolean;
  ivr_flag: boolean;
}

export interface IUser {
  id: string;
  role: string;
  featureFlag: IFeatureFlag;
  city: string;
  user_name: string;
  voter_id: string;
  pin_code: string;
  vendor_name: string;
  vendor_img: string;
  vendor_phone: string;
  password: string;
  driving_license: string;
  aadhaar_number: string;
  address_line_1: string;
  address_line_2: string;
  department: string;
  landmark: string;
  status: string;
}

export interface AuthSuccessResponse {
  success: true;
  user: IUser;
  token: string;
  msg: string;
}

interface AuthErrorResponse {
  success: false;
  msg: string;
}

export interface UserResponse {
  id: string;
  success: true;
  user: IUser;
  notifs: number;
  permissions: string[];
  ModulesEnabled: string[];
}
export type UserAuthResponse = AuthSuccessResponse | AuthErrorResponse;
