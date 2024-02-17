import React, { useContext } from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VideoContext } from '../context/VideoContext';
import VideoListItem from './VideoListItem';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '0px 20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  divider: {
    margin: '10px 0',
  },
  empty: {
    fontWeight: 500,
    marginTop: '20px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Playlist = () => {
  const { playlist, setPlaylist } = useContext(VideoContext);
  const classes = useStyles();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(playlist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaylist(items);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        All Playlist
      </Typography>
      {playlist?.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="playlist">
            {(provided) => (
              <ul
                className={classes.list}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {playlist?.map((video, index) => (
                  <Draggable
                    key={video.sources[0]}
                    draggableId={video.sources[0]}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        key={video.sources[0]}
                        className={classes.divider}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <VideoListItem video={video} index={index} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Typography variant="subtitle" className={classes.empty}>
          No Results Found..!
        </Typography>
      )}
    </Paper>
  );
};

export default Playlist;
