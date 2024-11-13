export const getProductImageLink = (image: string) => {
  return `https://${import.meta.env.VITE_BUCKET_NAME}.s3.${import.meta.env.VITE_BUCKET_REGION}.amazonaws.com/${image}`;
}

export const setLocal = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getLocal = (key: string) => {
  return localStorage.getItem(key)
}

