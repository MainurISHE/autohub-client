export const getSafeRedirect = (url?: string | null) => {
  if (!url?.startsWith("/") || url.startsWith("//")) {
    return null;
  }

  return url;
};
