// css
import { AppBar, Box, Stack, Typography } from '@mui/material';

const makeStreamer = (name) => {
  return <Typography variant='h6'>{name}</Typography>;
};

const WaitingStreamerList = () => {
  const Text = '다음 참가자 :';
  const List = ['민지', '해린', '혜인', '다니엘', '하니'];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative'>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='h6'>{Text}</Typography>
          {List.map((name) => {
            return makeStreamer(name);
          })}
        </Stack>
      </AppBar>
    </Box>
  );
};

export default WaitingStreamerList;
