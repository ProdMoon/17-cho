import { Typography, Paper } from '@mui/material';

const content = () => {
  return <Typography>이 공간은 openvidu를 위한 공간입니다.</Typography>;
};

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
      {content()}
    </Paper>
  );
};

export default NowStreaming;
