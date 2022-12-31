// css
import { AppBar, Box, Stack, Typography } from '@mui/material';

const makeStreamer = (name) => {
  return <Typography variant='h6'>{name}</Typography>;
};

const WaitingStreamerList = () => {
  const Text = '다음 참가자 :';
  const List = ['민지', '해린', '혜인', '다니엘', '하니'];
  return (
    <Box>
      <AppBar elevation={5} position='relative'>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
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
