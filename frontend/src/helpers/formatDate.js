export const formatDate = (date) => {
  const newDate = new Date(date);
  const config = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleDateString("us-EN", config);
};
