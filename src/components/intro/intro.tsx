import { Box, Typography } from '@mui/material';

const Intro = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Houses of the Oireachtas Bills
      </Typography>
      <Typography variant="body1" align="center" maxWidth={800}>
        In the table below, you can find information about the bills from the Houses of the
        Oireachtas
      </Typography>
    </Box>
  );
};

export default Intro;
