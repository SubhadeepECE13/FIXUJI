export type SettingsResponse = {
  mainUrl: string;
  phoneNumberForNotifications: number[];
  quality: number;
  tolerance: {
    time: number;
    distance: number;
  };
  messageFlag: boolean;
  paymentLink: string;
  callMaskingNumber: string;
  permissionFlag: {
    ivr: boolean;
    image_click: boolean;
    update_service: boolean;
  };
  version: string;
  appLink: string;
};
