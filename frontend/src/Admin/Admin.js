import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useEffect, useState } from 'react';

import UserVideoComponent from './UserVideoComponent';

const APPLICATION_SERVER_URL = 'http://localhost:5000/'; // tutorial 환경에서의 기본 URL

// const initSession = async (sessionId) => {
//   const response = await axios.post(
//     APPLICATION_SERVER_URL + 'api/sessions',
//     { customSessionId: sessionId },
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );

//   const openVidu = new OpenVidu('localhost', 'MY_SECRET');
//   const properties = {};
//   const session = await openVidu.createSession(properties);

//   const connectionProperties = {
//     role: 'PUBLISHER',
//     data: 'Alice',
//   };
//   const connection = await session.createConnection(connectionProperties);
//   const token = connection.token; // Send this string to the client side
// };

/**
 * ----------------------------------------
 * 당신의 APPLICATION SERVER에서 TOKEN 받아오기
 * ----------------------------------------
 * The methods below request the creation of a Session and a Token to
 * your application server. This keeps your OpenVidu deployment secure.
 *
 * In this sample code, there is no user control at all. Anybody could
 * access your application server endpoints! In a real production
 * environment, your application server must identify the user to allow
 * access to the endpoints.
 *
 * Visit https://docs.openvidu.io/en/stable/application-server to learn
 * more about the integration of OpenVidu in your application server.
 */
const getToken = async (mySessionId) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

const createSession = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions',
    { customSessionId: sessionId },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data; // The sessionId
};

const createToken = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data; // The token
};
/*********************************************************/

const Admin = () => {
  const [mySessionId, setMySessionId] = useState('');
  const [myUserName, setMyUserName] = useState('');
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined); // 내가 추가함

  let OV = null;

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  // const didMount = useRef(false);
  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //     return;
  //   }
  //   joinSessionCallBack();
  // }, [session])

  const onbeforeunload = () => {
    leaveSession();
  };

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let newSubscribers = [...subscribers];
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers(newSubscribers);
    }
  };

  const joinSession = () => {
    // 1) OpenVidu object를 받아옵니다.
    OV = new OpenVidu();

    // 2) Session을 초기화합니다.
    setSession(OV.initSession());

    // 3) Session에서 이벤트가 발생했을 때, 상황에 맞게 다음 동작들을 실행합니다.
    const mySession = session;

    // 새로운 Stream을 수신하는 경우...
    mySession.on('streamCreated', (event) => {
      // Stream을 구독합니다. 두번째 인자가 undefined이므로
      // OpenVidu는 HTML video를 스스로 만들어내지 않습니다.
      const subscriber = mySession.subscribe(event.stream, undefined);
      let newSubscribers = [...subscribers];
      newSubscribers.push(subscriber);
      // 새로 만들어진 subscribers를 state에 반영합니다.
      setSubscribers(newSubscribers);
    });

    // Stream이 종료되는 경우...
    mySession.on('streamDestroyed', (event) => {
      // stream을 subscribers 리스트에서 제거합니다.
      deleteSubscriber(event.stream.streamManager);
    });

    // 비동기 예외가 발생하는 경우...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 4) 유효한 user token을 가지고 session에 연결합니다.

    // OpenVidu deployment (미디어 서버)에서 token을 받아옵니다.
    getToken(mySessionId).then((token) => {
      // 첫번째 인자는 OpenVidu deployment에서 받아온 token입니다.
      // 두번째 인자는 'streamCreated' 이벤트가 발생한 모든 유저로부터 받아올 수 있으며,
      // 이것이 DOM에 추가되는 user의 nickname입니다.
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // 5) 고유 카메라 stream을 획득합니다.

          // undefined를 targetElement로 하여 publisher를 초기화합니다.
          // (OpenVidu가 video element를 삽입하도록 하고 싶지 않기 때문입니다. 우리가 직접 관리할 것입니다.)
          // 그리고 알맞은 속성값도 넣어줍니다.
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // 오디오 소스입니다. undefined이면 기본 마이크가 설정됩니다.
            videoSource: undefined, // 비디오 소스입니다. undefined이면 기본 웹캠이 설정됩니다.
            publishAudio: true, // false이면 오디오가 음소거인 상태로 시작됩니다.
            publishVideo: true, // false이면 비디오가 꺼진 상태로 시작됩니다.
            resolution: '640x480', // 비디오의 해상도를 조정합니다.
            frameRate: 30, // 비디오의 프레임레이트를 조정합니다.
            insertMode: 'APPEND', // 비디오가 target element인 'video-container'에 삽입되는 방식을 설정합니다.
            mirror: false, // 로컬 비디오를 미러링 할 것인지 여부를 설정합니다.
          });

          // 6) stream을 publish합니다.

          mySession.publish(publisher);

          // 현재 사용중인 비디오 디바이스를 획득합니다.
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const newCurrentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // 우리의 웹캠을 표시하기 위해서 state를 페이지에서의 메인 비디오로 설정해주고, publisher를 저장해줍니다.
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(newCurrentVideoDevice);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    // 7) Session object를 통해 'disconnect' 메서드를 호출함으로써 session을 종료합니다.
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // 모든 속성을 비워줍니다...
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // 비디오소스를 특정하여 새로운 publisher를 생성합니다.
          // 모바일 환경에서의 기본값은 전면 카메라입니다.
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          // newPublisher.once('accessAllowed', () => {
          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {session === undefined ? (
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={joinSession}
        >
          <Typography variant='h4'>비디오 세션 입장하기</Typography>
          <p />
          <TextField
            variant='filled'
            label='Participant'
            type='text'
            id='userName'
            value={myUserName}
            onChange={handleChangeUserName}
            required
          />
          <p />
          <TextField
            variant='filled'
            label='Session'
            type='text'
            id='sessionId'
            value={mySessionId}
            onChange={handleChangeSessionId}
            required
          />
          <p />
          <Button variant='contained' type='submit'>
            JOIN
          </Button>
        </Box>
      ) : null}

      {session !== undefined ? (
        <div id='session'>
            <div id='session-header'>
              <h1 id='session-title'>{mySessionId}</h1>
              <input
                className='btn btn-large btn-danger'
                type='button'
                id='buttonLeaveSession'
                onClick={leaveSession}
                value='Leave session'
              />
            </div>

            {mainStreamManager !== undefined ? (
              <div id='main-video' className='col-md-6'>
                <UserVideoComponent
                  streamManager={mainStreamManager}
                />
                <input
                  className='btn btn-large btn-success'
                  type='button'
                  id='buttonSwitchCamera'
                  onClick={switchCamera}
                  value='Switch Camera'
                />
              </div>
            ) : null}
            <div id='video-container' className='col-md-6'>
              {publisher !== undefined ? (
                <div
                  className='stream-container col-md-6 col-xs-6'
                  onClick={() =>
                    handleMainVideoStream(publisher)
                  }
                >
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className='stream-container col-md-6 col-xs-6'
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
      ) : null}
    </Box>
  );
};

export default Admin;