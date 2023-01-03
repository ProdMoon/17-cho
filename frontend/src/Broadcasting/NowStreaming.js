import { Paper } from '@mui/material';
import Admin from '../Admin/Admin';

const NowStreaming = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        height: 600,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Admin />
    </Paper>
  );
};

export default NowStreaming;
