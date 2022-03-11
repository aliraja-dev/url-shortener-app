export interface BitLyResponse {
  references?: {};
  link: string;
  id?: string;
  long_url?: string;
  archived?: boolean;
  created_at?: string;
  custom_bitlinks?: Array<any>;
  tags?: Array<any>;
  deeplinks?: Array<{
    "guid": string,
    "bitlink": string,
    "app_uri_path": string,
    "install_url": string,
    "app_guid": string,
    "os": string,
    "install_type": string,
    "created": string,
    "modified": string,
    "brand_guid": string
  }>;
}


