export interface ZohoResponse {
  data: {
    id: string;
    // Add other expected fields here
  }[];
  info?: {
    more_records?: boolean;
    count?: number;
  };
}