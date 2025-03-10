import { Bills } from 'types/bill';
import { ErrorResponse } from 'types/error';

import { useEffect, useState } from 'react';

interface DataParams {
  rowsPerPage: number;
  skip: number;
}

const useGetData = ({ rowsPerPage, skip }: DataParams) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Bills>();
  const [error, setError] = useState<ErrorResponse>();

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.oireachtas.ie/v1/legislation?limit=${rowsPerPage}&skip=${skip}`,
      );
      const data = await response.json();
      const bills = data.results;

      console.log(data);
      console.log(bills);
      setData(data);
    } catch (error) {
      console.error(error);
      setError(error as ErrorResponse);
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, skip]);

  return { data, loading, error };
};

export default useGetData;
