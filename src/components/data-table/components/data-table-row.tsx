import { Bill } from '@custom-types/bill';
import StarIcon from '@mui/icons-material/Star';
import { IconButton, TableCell, TableRow } from '@mui/material';
import useFavouritesStore from '@stores/favourite-bills-store';

interface BillRowProps {
  bill: Bill;
}

const DataTableRow = ({ bill }: BillRowProps) => {
  const isFavourite = useFavouritesStore((state) => state.isFavourite(bill.shortTitleEn));
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(bill);
    } else {
      addFavourite(bill);
    }
  };

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell>{bill.shortTitleEn}</TableCell>
      <TableCell>{bill.billNo}</TableCell>
      <TableCell>{bill.billType}</TableCell>
      <TableCell>{bill.status}</TableCell>
      {/* Note: Presumably the API is still in progress, as some of the sponsors are duplicated, and some probably unnecessary conditions had to be done. */}
      {/* Note: Also, since in the assignment says sponsor, and the API returns an array of sponsors, here I am displaying only the primary sponsor. */}
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
      <TableCell>
        <IconButton onClick={handleToggleFavourite}>
          <StarIcon sx={{ color: isFavourite ? 'gold' : 'gray' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DataTableRow;
