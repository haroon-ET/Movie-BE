export interface GetSignedUrlParams {
  Bucket: string;
  Key: string;
  Expires: number;
  ACL?: string;
  ContentType?: string;
}
