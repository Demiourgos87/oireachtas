import { TableCell, TableHead, TableRow } from '@mui/material';

const DataTableHead = () => {
  return (
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
  );
};

export default DataTableHead;
