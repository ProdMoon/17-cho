import { Typography, Paper, Grid } from '@mui/material';

const thisIsTempFunction = () => {
  const names = [
    '문준호',
    '김다엘',
    '정성현',
    '이강욱',
    '아이유',
    '이종석',
    '침착맨',
    '주호민',
    '김풍',
    '기안84',
    '나연',
    '정연',
    '모모',
    '사나',
  ];
  const contents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Nulla porta nulla et felis sodales, in tristique justo viverra.',
    'Aliquam sit amet leo et massa consequat facilisis non eget dui.',
    'Quisque vestibulum ligula nec dictum rutrum.',
    'Nam ut nulla non ex efficitur malesuada a nec mi.',
    'Sed pellentesque nisi id consectetur facilisis.',
    'Pellentesque at nisi eu nisi ullamcorper cursus.',
    'Integer non mi quis mauris mattis volutpat ac vitae ex.',
    'Nunc sed ligula vitae nunc mollis porttitor.',
    'Donec tincidunt odio eget diam vehicula, sit amet congue ante bibendum.',
    'Aliquam dapibus ipsum ut aliquet fringilla.',
    'In non felis ac massa facilisis semper sit amet vitae elit.',
    'Nullam vel lacus sed massa imperdiet suscipit quis id sapien.',
    'Curabitur auctor quam ac eleifend porttitor.',
  ];
  const chatLines = [];
  for (let i=0; i<names.length; i++) {
    let a = {};
    let b = {};
    a['nickname'] = names[i];
    b['chatContent'] = contents[i];
    let c = {...a, ...b};
    chatLines.push(c);
  }
  return chatLines;
}

// TODO: 서버에서 채팅 데이터를 받아오면 배열에 추가하여 rerendering.
const chattingView = () => {
  const chatLines = thisIsTempFunction();

  // const line = webSocket( data from server );
  // if (dataChanged) { chatLines.concat } then rerender.

  return chatLines.map((line) => {
    const { nickname, chatContent } = line;
    return (
      <Typography>
        {nickname} : {chatContent}
      </Typography>
    );
  });
};

const content = () => {
  const label = '채팅';
  return (
    <Grid container direction='column' p={1.5} spacing={1}>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item>{chattingView()}</Grid>
    </Grid>
  );
};

const Chat = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        height: 600,
        display: 'flex',
      }}
    >
      {content()}
    </Paper>
  );
};

export default Chat;
