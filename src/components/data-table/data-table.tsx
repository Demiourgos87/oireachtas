import { useDebounce } from 'use-debounce';

import { useState } from 'react';

import StatusFilter from '@components/status-filter/status-filter';
import useGetData from '@hooks/use-get-data';
import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

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
          <TableHead>
            <TableRow>
              <TableCell>Bill Title</TableCell>
              <TableCell>Bill Number</TableCell>
              <TableCell>Bill Type</TableCell>
              <TableCell>Bill Status</TableCell>
              <TableCell>Bill sponsors</TableCell>
              <TableCell>Favourite</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Alert severity="error">
                    An error occured when loading data. Please try again
                  </Alert>
                </TableCell>
              </TableRow>
            ) : data === undefined ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.results.map(({ bill }) => (
                <TableRow key={bill.shortTitleEn}>
                  <TableCell>{bill.shortTitleEn}</TableCell>
                  <TableCell>{bill.billNo}</TableCell>
                  <TableCell>{bill.billType}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                  {/* Note: Presumably the API is still in progress, as some of the sponsors are duplicated, and some probably unnecessary conditions had to be done. */}
                  {/* Also, since in the assignment says sponsor, and the API returns an array of sponsors, here I am displaying only the primary sponsor. */}
                  <TableCell>
                    {bill.sponsors.length
                      ? bill.sponsors
                          .filter(({ sponsor }) => sponsor.isPrimary)
                          .slice(0, 1)
                          .map(({ sponsor }) => {
                            if (sponsor.isPrimary) {
                              const showAs = sponsor.as.showAs
                                ? sponsor.as.showAs
                                : sponsor.by.showAs;

                              return showAs;
                            }
                          })
                      : ''}
                  </TableCell>
                  <TableCell>Favourite</TableCell>
                </TableRow>
              ))
            )}
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
