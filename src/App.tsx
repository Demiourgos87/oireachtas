import DataTable from '@components/data-table/data-table';
import Intro from '@components/intro/intro';
import { Box, Container } from '@mui/material';

// import TestComponent from '@components/test-component/test-component';

function App() {
  return (
    <Container>
      <Box>
        {/* <TestComponent /> */}
        <Intro />
        <DataTable />
      </Box>
    </Container>
  );
}

export default App;
