// import axios from "axios";

// pages
import WaitingStreamerList from './WaitingStreamerList';
import NowStreaming from './NowStreaming';
import Chat from './Chat';

// css
import { Box, Grid } from '@mui/material';

// 이어지는 방송
// axios.get('/api/broadcasting/initialroom/readyqueue')
// 필요한 정보 { 대기자 수, 대기자 닉네임 }

// openvidu
// media 서버에서 중계하는 영상 받을 예정
// 받는 데이터 형태, 받는 수단에 대한 정의 필요.

// 채팅창
// axios.get('/api/broadcasting/initialroom/chat')
// get : (아마) websocket으로 받는다면, 채팅이 이루어질 때마다 갱신 필요
// axios.post('/api/broadcasting/initialroom/chat')
// post: 사용자가 입력한 채팅을 전송 { id값, 채팅내용 }

// 좋아요
// axios.get('/api/broadcasting/initialroom/like')
// axios.post('/api/broadcasting/initialroom/like')

// 남은 시간
// axios.get('/api/broadcasting/initialroom/timeleft')

function Broadcasting() {
  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={1}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <WaitingStreamerList />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8}>
            <NowStreaming />
          </Grid>
          <Grid item xs={4}>
            <Chat />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Broadcasting;
