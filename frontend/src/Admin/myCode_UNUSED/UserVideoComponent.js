import React from 'react';
import OpenViduVideoComponent from './OvVideo';

const UserVideoComponent = (props) => {

  const streamManager = props.streamManager;

  const getNicknameTag = () => {
    // 유저의 닉네임을 획득합니다.
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent streamManager={streamManager} />
          <div><p>{getNicknameTag}</p></div>
        </div>
      ) : null}
    </div>
  )
}

export default UserVideoComponent;