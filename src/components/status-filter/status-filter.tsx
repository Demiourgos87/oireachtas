import { useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface StatusFilterProps {
  onFilterChange: (selectedStatuses: string[]) => void;
}

const StatusFilter = ({ onFilterChange }: StatusFilterProps) => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const statuses = ['Current', 'Withdrawn', 'Enacted', 'Rejected', 'Defeated', 'Lapsed'];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    setStatusFilter(value);
    onFilterChange(value);
  };

  const clearStatusFilter = () => {
    setStatusFilter([]);
    onFilterChange([]);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        marginBottom: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}
    >
      <Typography component="span" marginRight={2}>
        Filter:{' '}
      </Typography>

      <FormControl>
        <InputLabel id="bill-status-label">Bill Status</InputLabel>

        <Select
          multiple
          labelId="bill-status-label"
          id="bill-status-select"
          value={statusFilter}
          onChange={handleStatusChange}
          sx={{ width: isMobile ? '10rem' : '20rem' }}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {statusFilter.length !== 0 && (
        <Button onClick={clearStatusFilter} sx={{ marginLeft: 2 }}>
          Clear status
        </Button>
      )}
    </Box>
  );
};

export default StatusFilter;
