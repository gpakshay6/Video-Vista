import React, { createContext, useState } from 'react';
import { playlistData } from '../data/playlistData';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(playlistData.categories[0].videos);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const searchAndUpdatePlaylist = (searchString) => {
    const filteredPlaylist = playlistData.categories[0].videos.filter((video) =>
      video.title.toLowerCase().includes(searchString.toLowerCase())
    );

    setPlaylist(filteredPlaylist);
    return filteredPlaylist;
  };

  const playNextVideo = () => {
    const currentIndex = playlist.findIndex(
      (video) => video.title === currentVideo.title
    );
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      const nextVideo = playlist[currentIndex + 1];
      setTimeout(() => {
        playVideo(nextVideo);
      }, 3000);
    } else {
      console.log('No next video found or already playing the last video.');
    }
  };

  const playVideo = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    setIsPlaying(false);
  };

  const seekVideo = (time) => {
    setCurrentTime(time);
    if (currentVideo) {
      const video = document.getElementsByTagName('video')[0];
      video.currentTime = time;
    }
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (currentVideo) {
      const video = document.getElementsByTagName('video')[0];
      video.playbackRate = speed;
    }
  };

  return (
    <VideoContext.Provider
      value={{
        playlist,
        currentVideo,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        setPlaylist,
        setCurrentVideo,
        setIsPlaying,
        setCurrentTime,
        setDuration,
        setPlaybackSpeed,
        playVideo,
        pauseVideo,
        seekVideo,
        changeSpeed,
        playNextVideo,
        searchAndUpdatePlaylist,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
