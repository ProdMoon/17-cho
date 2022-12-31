import { Typography, Paper } from '@mui/material';

const content = () => {
  return <Typography>이 공간은 채팅창을 위한 공간입니다.</Typography>;
};

const Chat = () => {
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

export default Chat;
