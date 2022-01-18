/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  Typography,
  DialogContentText,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const grid = 8;

export default function DMEditForm(props) {
  const { open } = props;

  const [itemData, setItemData] = useState([
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
    },
    {
      id: 7,
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      id: 8,
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      id: 9,
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
    },
    {
      id: 10,
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      id: 11,
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      id: 12,
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
    },
  ]);
  const reorder = (list, startIndex, endIndex) => {
    console.log(list);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver, itemsLength) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    background: 'red',
    display: 'flex',
    padding: grid,
    width: '100%',
    overflow: 'auto',
    //width: itemsLength * 68.44 + 16,
  });
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      itemData,
      result.source.index,
      result.destination.index
    );

    setItemData(items);
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={true}
        // onClose={() => {
        //   props.closeDMEditForm();
        // }}
      >
        <DialogTitle style={{ fontSize: 20, marginBottom: 20 }}>
          Add New Message in Pool
        </DialogTitle>
        <DialogContent>
          <Grid sx={{ marginBottom: 5 }}>
            <Typography variant="h5">Edit Message</Typography>
            <Typography>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Typography>
          </Grid>
          <Grid sx={{ marginBottom: 5 }}>
            <Typography variant="h5">Edit Price Range</Typography>
            <TextField
              sx={{ marginRight: 5 }}
              autoFocus
              id="price2"
              label="Min Price"
              type="number"
              variant="standard"
            />
            <TextField
              autoFocus
              id="price2"
              label="Max Price"
              type="number"
              variant="standard"
            />
          </Grid>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Select Previews
          </Typography>

          <div style={{ overflow: 'auto', width: '100%' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(
                      snapshot.isDraggingOver,
                      itemData.length
                    )}
                    {...provided.droppableProps}
                  >
                    {itemData.map((item, index) => (
                      <Draggable
                        key={`${item.id}`}
                        draggableId={`${item.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <img
                              {...srcset(item.img, 250, 200, 1, 1)}
                              alt={item.title}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
          // onClick={() => {
          //   props.closeDMEditForm();
          // }}
          >
            Save
          </Button>
          <Button
          // onClick={() => {
          //   props.closeDMEditForm();
          // }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
