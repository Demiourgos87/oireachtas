import { useDebounce } from 'use-debounce';

import { useState } from 'react';

import ErrorComponent from '@components/error-component/error-component';
import Loading from '@components/loading/loading';
import NoData from '@components/no-data/no-data';
import StatusFilter from '@components/status-filter/status-filter';
import useGetData from '@hooks/use-get-data';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import DataTableHead from './components/data-table-head';
import DataTableRow from './components/data-table-row';

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [debouncedStatuses] = useDebounce(statusFilter, 300);
  const skip = page * rowsPerPage;
  const { data, loading, error } = useGetData({
    rowsPerPage,
    skip,
    filterByStatus: debouncedStatuses,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const resultsCount = data?.head.counts.resultCount ?? 0;

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
  };

  const onFilterChange = (payload: string[]) => {
    setStatusFilter(payload);
    setPage(0);
  };

  return (
    <Paper sx={{ padding: '20px' }}>
      <StatusFilter onFilterChange={onFilterChange} />

      <TableContainer sx={{ height: '60vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <DataTableHead />

          <TableBody>
            {(loading || error || data?.results.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {loading && <Loading />}

                  {error && <ErrorComponent />}

                  {!loading && data?.results.length === 0 && <NoData />}
                </TableCell>
              </TableRow>
            )}

            {!loading && data?.results.map(({ bill }) => <DataTableRow bill={bill} />)}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={resultsCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
        }}
      />
    </Paper>
  );
};

export default DataTable;
