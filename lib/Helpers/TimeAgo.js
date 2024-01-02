export function timeAgo(timestamp) {
  const dateObject = new Date(timestamp);
  const now = new Date();
  const timeDifference = now - dateObject;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

export function formatCurrency(amount) {
  // Ensure the amount is a number
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount);

  // Check if the amount is a valid number
  if (isNaN(numericAmount)) {
    console.error("Invalid number for formatting currency");
    return "Invalid";
  }

  // Format the number as currency with two decimal places
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GMD", // You can change this to your desired currency code
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);

  return formattedAmount;
}
