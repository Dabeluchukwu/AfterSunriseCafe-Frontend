export const formatPrice = (n) => {
  if (n === null || n === undefined) return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });