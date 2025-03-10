import { Bill } from '@custom-types/bill';
import { TableCell, TableRow } from '@mui/material';

interface BillRowProps {
  bill: Bill;
}

const DataTableRow = ({ bill }: BillRowProps) => {
  return (
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
                  const showAs = sponsor.as.showAs ? sponsor.as.showAs : sponsor.by.showAs;

                  return showAs;
                }
              })
          : ''}
      </TableCell>
      <TableCell>Favourite</TableCell>
    </TableRow>
  );
};

export default DataTableRow;
