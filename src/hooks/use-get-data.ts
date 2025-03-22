import { useCallback, useEffect, useState } from 'react';

import { Bills } from '@custom-types/bill';
import { DataParams } from '@custom-types/data';
import { ErrorResponse } from '@custom-types/error';
import { buildQueryString } from '@utils/build-query-string';
import { endpoints } from '@utils/endpoints';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetData = ({ rowsPerPage, skip, filterByStatus }: DataParams) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Bills>();
  const [error, setError] = useState<ErrorResponse>();

  const legislationEndpoint = endpoints.legislation;
  const uri = `${API_BASE_URL}${legislationEndpoint}`;

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const queryString = buildQueryString({ rowsPerPage, skip, filterByStatus });
      const response = await fetch(`${uri}?${queryString}`);
      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(error as ErrorResponse);
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  }, [filterByStatus, rowsPerPage, skip, uri]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
};

export default useGetData;
