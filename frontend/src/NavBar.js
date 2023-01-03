import { AppBar, Button, Grid } from '@mui/material';
import Login from './Login/Login';
import SocialLogin from './Login/SocialLogin';
import OpenModal from './utils/OpenModal';

const authenticUser = () => {
  return (
    // TODO: 로그아웃 버튼을 팝업메뉴로 대체 (https://mui.com/material-ui/react-app-bar/#app-bar-with-menu)
    <Grid container spacing={2}>
      <Grid item xs={10} />
      <Grid item xs='auto'>
        <Button color='inherit'>Logout</Button>
      </Grid>
    </Grid>
  );
};

const anonymous = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} />
      <Grid item xs='auto'>
        <OpenModal buttonLabel='Login' contentPage={<SocialLogin />} />
      </Grid>
    </Grid>
  );
};

const NavBar = (props) => {
  // const isAuthentic = props.isAuthentic;
  const isAuthentic = false;
  return (
    <AppBar
      position='sticky'
      color='primary'
      sx={{
        height: 50,
        p: 1,
      }}
    >
      {isAuthentic ? authenticUser() : anonymous()}
    </AppBar>
  );
};

export default NavBar;
