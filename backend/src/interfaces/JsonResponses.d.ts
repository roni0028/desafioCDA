declare interface JsonResponses {
  status: boolean;
  code: number;
  message: string;
  data?: any | null | undefined;
  token?: string | null | undefined;
}
