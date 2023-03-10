import { Box, Fab, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// CSS
import './Home.css';

function Home() {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          position: 'fixed',
          top: '15%',
        }}
      >
        <Grid item>
          <Typography variant='h2'>뉴진스 민지</Typography>
          <Typography variant='h2'>너무예쁘네요</Typography>
        </Grid>
      </Grid>
      <Link className='text-link' to='/broadcasting'>
        <Fab
          variant='extended'
          color='primary'
          aria-label='navigate'
          sx={{
            position: 'fixed',
            top: '82%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 4,
          }}
        >
          <Typography variant='h4'>입장하기</Typography>
        </Fab>
      </Link>
    </Box>
  );
}

export default Home;
