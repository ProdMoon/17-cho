import { AppBar, Grid } from '@mui/material';
import Login from './Login/Login';
import OpenModal from './utils/OpenModal';

const NavBar = () => {
  return (
    <AppBar
      position='sticky'
      color='primary'
      sx={{
        height: 60,
        p: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={10} />
        <Grid item xs='auto'>
          <OpenModal buttonLabel='Login' contentPage={<Login />} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavBar;
