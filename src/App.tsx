import DataTable from '@components/data-table/data-table';
import Intro from '@components/intro/intro';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Box>
        <Intro />
        <DataTable />
      </Box>
    </Container>
  );
}

export default App;
