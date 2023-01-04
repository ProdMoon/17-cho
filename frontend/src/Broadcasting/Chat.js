import { Typography, Paper, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);
  const username = sessionStorage.getItem('id');
  const chattingViewRef = useRef();
  const label = '채팅';

  useEffect(() => {
    const socket = new SockJS('http://3.36.108.84:8080/ws');
    const stompClient = Stomp.over(socket);
    setClient(stompClient);
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/public', (message) => {
        const messageBody = JSON.parse(message.body);
        if (messageBody.type === 'CHAT') {
          setMessages((prevMessages) => [...prevMessages, message]);
          scrollDown();
        }
      });
      stompClient.send(
        '/app/chat.addUser',
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
      );
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollDown = () => {
    chattingViewRef.current.scrollIntoView(false);
  };

  const sendMessage = () => {
    // e.preventDefault();
    const chatMessage = {
      sender: username,
      content: message,
      type: 'CHAT',
    };
    client.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    setMessage('');
  };

  const chattingView = () => {
    return (
      <div>
        {messages.map((message) => {
          const messageBody = JSON.parse(message.body);
          return (
            <Typography>
              {messageBody.sender + ' : ' + messageBody.content}
              {/* {console.log(messageBody.content)} */}
            </Typography>
          );
        })}
      </div>
    );
  };

  const inputBox = () => {
    return (
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder='Enter키로 메시지 전송'
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
    );
  };

  return (
    <Paper
      elevation={5}
      sx={{
        height: 600,
        display: 'flex',
      }}
    >
      <Grid container direction='column' p={1.5} spacing={1}>
        <Grid item xs='auto'>
          <Typography variant='h5'>{label}</Typography>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            overflowY: 'scroll',
          }}
        >
          <div ref={chattingViewRef}>{chattingView()}</div>
        </Grid>
        <Grid item xs='auto'>
          {inputBox()}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chat;
