// lib/formatDate.js

// Format a timestamp into a readable date string (e.g., "27 Jul 2025, 10:30 AM")
export function formatDate(timestamp) {
  const date = new Date(timestamp); // Convert timestamp to Date object

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',      // Show day (e.g., 27)
    month: 'short',      // Show abbreviated month (e.g., Jul)
    year: 'numeric',     // Show full year (e.g., 2025)
    hour: 'numeric',     // Show hour (12-hour format)
    minute: '2-digit',   // Show minutes with leading zero if needed
  });
}
