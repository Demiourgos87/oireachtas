import { useEffect, useState } from 'react';

import { Bills } from '@custom-types/bill';
import { ErrorResponse } from '@custom-types/error';
import { endpoints } from '@utils/endpoints';

interface DataParams {
  rowsPerPage: number;
  skip: number;
  filterByStatus?: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetData = ({ rowsPerPage, skip, filterByStatus }: DataParams) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Bills>();
  const [error, setError] = useState<ErrorResponse>();

  const legislationEndpoint = endpoints.legislation;
  const uri = `${API_BASE_URL}${legislationEndpoint}`;

  const buildQueryString = () => {
    const params = new URLSearchParams();

    params.append('limit', rowsPerPage.toString());
    params.append('skip', skip.toString());

    if (filterByStatus && filterByStatus.length > 0) {
      params.append('bill_status', filterByStatus.join(','));
    }

    return params.toString();
  };

  const getData = async () => {
    setLoading(true);

    try {
      const queryString = buildQueryString();
      const response = await fetch(`${uri}?${queryString}`);
      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(error as ErrorResponse);
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, skip, filterByStatus]);

  return { data, loading, error };
};

export default useGetData;
