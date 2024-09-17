export const getProductImageLink = (image: string) => {
  return `https://${import.meta.env.VITE_BUCKET_NAME}.s3.${import.meta.env.VITE_BUCKET_REGION}.amazonaws.com/${image}`;
}