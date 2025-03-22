import { DataParams } from '@custom-types/data';

export const buildQueryString = ({ rowsPerPage, skip, filterByStatus }: DataParams) => {
  const params = new URLSearchParams();

  params.append('limit', rowsPerPage.toString());
  params.append('skip', skip.toString());

  if (filterByStatus && filterByStatus.length > 0) {
    params.append('bill_status', filterByStatus.join(','));
  }

  return params.toString();
};
