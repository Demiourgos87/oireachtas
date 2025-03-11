import { useDebounce } from 'use-debounce';

import { useState } from 'react';

import ErrorComponent from '@components/error-component/error-component';
import Loading from '@components/loading/loading';
import NoData from '@components/no-data/no-data';
import StatusFilter from '@components/status-filter/status-filter';
import useGetData from '@hooks/use-get-data';
import {
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useFavouritesStore from '@stores/favourite-bills-store';

import DataTableHead from './components/data-table-head';
import DataTableRow from './components/data-table-row';

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [debouncedStatuses] = useDebounce(statusFilter, 300); // debounce the clicks on select options to avoid too many requests
  const skip = page * rowsPerPage;
  const { data, loading, error } = useGetData({
    rowsPerPage,
    skip,
    filterByStatus: debouncedStatuses,
  });
  const [currentTab, setCurrentTab] = useState(0);
  const favourites = useFavouritesStore((state) => state.favourites);

  const displayData =
    currentTab === 0 ? (data?.results ?? []) : favourites.map((bill) => ({ bill }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const resultsCount = data?.head.counts.resultCount ?? 0;

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const onFilterChange = (payload: string[]) => {
    setStatusFilter(payload);
    setPage(0);
  };

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  return (
    <Paper sx={{ padding: '20px' }}>
      <Tabs value={currentTab} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
        <Tab label="All bills" />
        <Tab label={`Favourites ${favourites.length}`} />
      </Tabs>

      {currentTab === 0 && <StatusFilter onFilterChange={onFilterChange} />}

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

            {!loading &&
              displayData.map(({ bill }) => <DataTableRow key={bill.shortTitleEn} bill={bill} />)}
          </TableBody>
        </Table>
      </TableContainer>

      {currentTab === 0 && (
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
      )}
    </Paper>
  );
};

export default DataTable;
