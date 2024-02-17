import React, { useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import SearchIcon from '@mui/icons-material/Search';
import { VideoContext } from './context/VideoContext';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import './styles/App.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  minWidth: '250px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const App = () => {
  const { currentVideo, searchAndUpdatePlaylist } = useContext(VideoContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setIsPlaying(currentVideo !== null);
  }, [currentVideo]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    searchAndUpdatePlaylist(event.target.value);
  };

  return (
    <Container maxWidth="xl" className="app-background">
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#401641' }}>
        <Toolbar variant="dense">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={7} sx={{ display: 'inline-flex' }}>
              <SlowMotionVideoIcon sx={{ marginRight: '5px' }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: '1.21rem' }}
              >
                Video-Vista
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by Title"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </Search>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {isPlaying && (
          <Grid item md={8} xs={12}>
            <Card>
              <CardContent>
                <VideoPlayer isInputFocused={isInputFocused} />
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item md={isPlaying ? 4 : 12} xs={12}>
          <Playlist />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
