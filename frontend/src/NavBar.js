import { AppBar, Button, Grid } from '@mui/material';
import { useRef } from 'react';
import Login from './Login/Login';
// import SocialLogin from './Login/SocialLogin';
import OpenModal from './utils/OpenModal';

const authenticUser = () => {
  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  }
  return (
    // TODO: 로그아웃 버튼을 팝업메뉴로 대체 (https://mui.com/material-ui/react-app-bar/#app-bar-with-menu)
    <Grid container spacing={2}>
      <Grid item xs={10} />
      <Grid item xs='auto'>
        <Button onClick={logout} color='inherit'>Logout</Button>
      </Grid>
    </Grid>
  );
};

const anonymous = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} />
      <Grid item xs='auto'>
        <OpenModal buttonLabel='Login' contentPage={<Login />} />
      </Grid>
    </Grid>
  );
};

const NavBar = (props) => {
  const currentId = sessionStorage.getItem('id');

  return (
    <AppBar
      position='sticky'
      color='primary'
      sx={{
        height: 50,
        p: 1,
      }}
    >
      {currentId ? authenticUser() : anonymous()}
    </AppBar>
  );
};

export default NavBar;
