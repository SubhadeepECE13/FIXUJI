export interface AddonVariantType {
  duration: number;
  display_price: number;
  actual_price: number;
  vehicle_type: string;
}

export interface AddonType {
  id: string;
  addon_name: string;
  addon_img?: string;
  addon_desc?: string;
  addon_type?: string;
  variant: AddonVariantType[];
  sort_order?: number;
  service_pack?: string[];
  recommended?: boolean;
}

export interface ServiceVariantType {
  display_price: number;
  actual_price: number;
  duration: number;
  vehicle_type: string;
  sort_order?: number;
  default?: boolean | string;
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  variant: ServiceVariantType[];
  addons: AddonType[];
  type?: string;
  color?: string;
  sort_order?: number;
}
