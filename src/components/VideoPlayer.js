import React, { useContext, useEffect, useRef, useState } from 'react';
import { VideoContext } from '../context/VideoContext';
import { formatTime } from '../utils/utilities';
import {
  CircularProgress,
  Slider,
  Typography,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ isInputFocused }) => {
  const {
    currentVideo,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    playbackSpeed,
    setCurrentTime,
    setDuration,
    playVideo,
    pauseVideo,
    seekVideo,
    changeSpeed,
    playNextVideo,
  } = useContext(VideoContext);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentVideo) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentVideo, isPlaying]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isInputFocused) {
        switch (event.key) {
          case ' ':
            togglePlayPause();
            break;
          case 'ArrowUp':
            increaseVolume();
            break;
          case 'ArrowDown':
            decreaseVolume();
            break;
          case 'ArrowLeft':
            seekBackward();
            break;
          case 'ArrowRight':
            seekForward();
            break;
          case 'f':
          case 'F':
            toggleFullscreen();
            break;
          case 'm':
          case 'M':
            toggleMute();
            break;
          default:
            break;
        }
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFocused]);

  const togglePlayPause = () => {
    if (currentVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const decreaseVolume = () => {
    if (videoRef.current.volume >= 0.1) {
      setVolume((videoRef.current.volume -= 0.1));
    } else {
      setVolume((videoRef.current.volume = 0));
    }
  };

  const increaseVolume = () => {
    if (videoRef.current.volume <= 0.9) {
      setVolume((videoRef.current.volume += 0.1));
    } else {
      setVolume((videoRef.current.volume = 1));
    }
  };

  const seekForward = () => {
    if (videoRef.current.currentTime + 10 < videoRef.current.duration) {
      videoRef.current.currentTime += 10;
    }
  };

  const seekBackward = () => {
    if (videoRef.current.currentTime - 10 > 0) {
      videoRef.current.currentTime -= 10;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current.muted) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(true);
    } else {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo(currentVideo);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    seekVideo(seekTime);
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    changeSpeed(speed);
  };

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((error) => {
            console.error('Exit fullscreen error:', error);
          });
      } else if (document.webkitExitFullscreen) {
        document
          .webkitExitFullscreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((error) => {
            console.error('Exit fullscreen error:', error);
          });
      } else if (document.mozCancelFullScreen) {
        document
          .mozCancelFullScreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((error) => {
            console.error('Exit fullscreen error:', error);
          });
      } else if (document.msExitFullscreen) {
        document
          .msExitFullscreen()
          .then(() => {
            setIsFullScreen(false);
          })
          .catch((error) => {
            console.error('Exit fullscreen error:', error);
          });
      }
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    videoRef.current.volume = newValue;
    setIsMuted(newValue === 0);
  };

  return (
    <>
      <div className="video-player">
        {currentVideo ? (
          <>
            <video
              ref={videoRef}
              src={currentVideo.sources}
              poster={currentVideo.thumb}
              preload="none"
              onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
              onLoadedMetadata={() => setDuration(videoRef.current.duration)}
              onClick={handlePlayPause}
              onEnded={playNextVideo}
            />
            <div className="controls">
              <button onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="input-slider"
                style={{
                  background: `linear-gradient(to right, #fa5252 ${
                    (currentTime / duration) * 100
                  }%, #fff ${(currentTime / duration) * 100}%)`,
                }}
              />
              <Typography variant="caption">
                {formatTime(currentTime)}
              </Typography>{' '}
              /{' '}
              <Typography variant="caption">{formatTime(duration)}</Typography>
              <select
                value={playbackSpeed}
                onChange={handleSpeedChange}
                className="custom-select"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
              {!isSmallScreen && (
                <Slider
                  value={isMuted ? 0 : volume}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={handleVolumeChange}
                  aria-labelledby="Volume"
                  style={{ color: 'white', width: '70px' }}
                  size="small"
                />
              )}
              <IconButton onClick={toggleMute} color="inherit">
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <button onClick={handleFullScreen}>
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
        }}
        className="description"
      >
        {currentVideo.title}
      </Typography>
      <Typography variant="caption" className="description">
        {currentVideo.description}
      </Typography>
    </>
  );
};

export default VideoPlayer;
