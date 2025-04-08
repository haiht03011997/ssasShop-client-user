export const formatCurrencyVND = value => {
  // Format the value as VND
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseCurrencyVND = value => {
  // Remove non-numeric characters and parse the value
  const parsedValue = value.replace(/₫\s?|(,*)/g, '');

  return parsedValue;
};

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const calculateStats = values => {
  const totalReviews = values.length;
  const avgRating = totalReviews > 0 ? values.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews : 0;

  const ratingCounts = [0, 0, 0, 0, 0];
  values.forEach(review => {
    ratingCounts[review.rating - 1] += 1;
  });

  return { avgRating, ratingCounts, totalReviews };
};

export const toSlugKeepDiacritics = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9\u00C0-\u1EF9\s-]/g, "") // giữ lại ký tự có dấu
    .replace(/\s+/g, "-"); // khoảng trắng -> gạch nối
};
