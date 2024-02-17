import React, { useContext } from 'react';
import { Card, CardMedia, Typography, Grid, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { makeStyles } from '@mui/styles';
import { VideoContext } from '../context/VideoContext';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    '&:hover $overlay': {
      opacity: 1,
      animation: '$bounce 0.3s forwards',
    },
    '&:hover $image': {
      filter: 'blur(2px)',
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  textContainer: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#000',
    margin: '10px 12px !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    wordWrap: 'break-word',
  },
  videoTimings: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '3px',
    borderRadius: '5px',
  },

  '@keyframes bounce': {
    '0%': {
      transform: 'translateY(100%)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}));

const VideoListItem = ({ video, index }) => {
  const classes = useStyles();
  const { playVideo, currentVideo } = useContext(VideoContext);

  const handleSelect = () => {
    playVideo(video);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={currentVideo === null ? 4 : 5}>
        <Card className={classes.card} onClick={handleSelect}>
          <CardMedia
            component="img"
            image={video.thumb}
            alt={video.title}
            className={`${classes.image} image`}
            style={{ objectFit: 'cover' }}
          />

          <div className={`${classes.overlay} overlay`}>
            <div className={classes.textContainer}>
              <PlayArrowIcon fontSize="large" />
            </div>
          </div>
          <div className={classes.videoTimings}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
              }}
            >
              {video.time}
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid item xs={currentVideo === null ? 8 : 7}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
          className={classes.description}
        >
          {video.title}
        </Typography>
        <Tooltip title={video.description} placement="top" arrow>
          <Typography variant="caption" className={classes.description}>
            {video.description}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default VideoListItem;
