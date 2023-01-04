import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

const GoogleLogin = () => {
  
}

// const loginHandler = () => {
//   return (

//   )
// }

const SocialLogin = () => {
  const [userName, setUserName] = useState(undefined);

  return (
    <Box>
      {userName === undefined ? (
        <Box>
          <Button
            onClick={() =>
              window.open('/oauth2/authorization/google', '_blank')
            }
            variant='contained'
          >
            Google Login
          </Button>
        </Box>
      ) : null}
      {userName !== undefined ? (
        <Typography>아직 로그아웃 구현 전임.</Typography>
      ) : null}
    </Box>
  );
};

export default SocialLogin;
