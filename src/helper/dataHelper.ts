export const formatDate = (isoDate: string) => {
  const dateObj = new Date(isoDate);

  return dateObj.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
