export interface ZohoRecord {
  code: string;
  details: {
    id?: string;
    api_name?: string;
    expected_data_type?: string;
  };
  message: string;
  status: string;
}

export interface ZohoResponse {
  data: ZohoRecord[];
  info?: {
    more_records?: boolean;
    count?: number;
  };
}

export function isSuccessRecord(record: ZohoRecord): boolean {
  return record.status === 'success' && 'id' in record.details;
}