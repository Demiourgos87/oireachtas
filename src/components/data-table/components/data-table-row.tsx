import DOMPurify from 'dompurify';

import { useState } from 'react';

import { Bill } from '@custom-types/bill';
import StarIcon from '@mui/icons-material/Star';
import { Box, IconButton, Modal, Tab, TableCell, TableRow, Tabs, Typography } from '@mui/material';
import useFavouritesStore from '@stores/favourite-bills-store';

interface BillRowProps {
  bill: Bill;
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#ffffff',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const DataTableRow = ({ bill }: BillRowProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const isFavourite = useFavouritesStore((state) => state.isFavourite(bill.shortTitleEn));
  const addFavourite = useFavouritesStore((state) => state.addFavourite);
  const removeFavourite = useFavouritesStore((state) => state.removeFavourite);

  const handleToggleModal = (state: boolean) => {
    setModalOpened(state);
  };

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const sanitizeHTML = (str: string) => {
    return DOMPurify.sanitize(str);
  };

  const handleToggleFavourite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (isFavourite) {
      removeFavourite(bill);
    } else {
      addFavourite(bill);
    }
  };

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleToggleModal(true)}>
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

      <Modal
        open={modalOpened}
        onClose={() => handleToggleModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Tabs value={currentTab} onChange={handleTabChange} sx={{ marginBottom: 4 }}>
            <Tab label="English" />
            <Tab label="Gaeilge" />
          </Tabs>

          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html:
                currentTab === 0 ? sanitizeHTML(bill.longTitleEn) : sanitizeHTML(bill.longTitleGa),
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableRow;
