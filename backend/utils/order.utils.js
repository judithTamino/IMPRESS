import mongoose from 'mongoose';

const getDateRange = (range) => {
  const now = new Date();
  const from = new Date();

  switch (range) {
    case '7d':
      from.setDate(now.getDate() - 7);
      break;

    case '1m':
      from.setDate(now.getMonth() - 1);
      break;

    case '1y':
      from.setDate(now.getFullYear() - 1);
      break;

    default:
      return null;
  }
  return { $gte: from, $lte: now };
}

export const orderFilter = (filter, query) => {
  if (query.status)
    if (query.status === 'unpaid')
      filter.paymentStatus = query.status;
    else filter.status = query.status;
    
  if (query.date) {
    const range = getDateRange(query.date);
    if (range) filter.createdAt = range;
  }

  if (query.search && mongoose.Types.ObjectId.isValid(query.search))
    filter._id = query.search;

  return filter;
}