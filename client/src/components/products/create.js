import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Card,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Chip,
  Paper,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  resetServerContext,
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

import WallpaperIcon from '@material-ui/icons/Wallpaper';
import BackupIcon from '@material-ui/icons/Backup';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LayersIcon from '@material-ui/icons/Layers';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import TitleIcon from '@material-ui/icons/Title';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
  input: {
    ...theme.typography.input,
    borderRadius: '3px',
    background: '#fbfbfd',
    boxShadow: 'none',
    '&::placeholder': {
      fontFamily: 'Averta',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
  },
  inputOutline: {
    border: '1px solid #899298',
  },
  inputOutlineNoBorder: {
    border: 0,
  },
  hide: {
    display: 'none',
  },
  dropzoneRoot: {
    minHeight: '100px',
  },

  dropZoneTextContainer: {
    margin: 0,
  },
  select: {
    ...theme.typography.label,
    '& .MuiSelect-select:focus': {
      backgroundColor: 'white',
    },
  },
}));
export default function Create(props) {
  const { product, setProduct, categories, shopData } = props;
  const t = props.languageJson;

  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const [shop, setShop] = useState(shopData);
  const [tag, setTag] = useState();

  const compatibleList = [
    'Adobe Illustrator',
    'Adobe Reader',
    'Microsoft PowerPoint',
    'Microsoft Word',
    'Adobe Photoshop',
    'Photoshop Elements*',
    'Adobe InDesign',
  ];
  resetServerContext();

  useEffect(() => {
    //Here we have to find shop id and shopname (if shop is pending navigate to shop page)
    if (!shop.shopStatus) {
      router.push('/partner');
    }
  }, []);

  const setProductTags = (e) => {
    if (e.keyCode == 13 && tag !== '') {
      console.log(tag.split(',').map((item) => item.trim()));
      setProduct((pro) => {
        return {
          ...pro,
          tags: tag.split(',').map((item) => item.trim()),
        };
      });
    }
  };
  const handleTagDelete = (index) => {
    setProduct({
      ...product,
      tags: product.tags.filter((item, i) => i !== index),
    });
  };
  const handleImageDeleteHandler = (index) => {
    const productCopy = { ...product };
    const images = [...productCopy.images];
    const newImages = images.filter((item, i) => i !== index);
    setProduct({
      ...product,
      images: newImages,
    });

    console.log(product.images);
  };
  const handlecompatibleWithDelete = (index) => {
    setProduct({
      ...product,
      compatibleWith: product.compatibleWith.filter((item, i) => i !== index),
    });
  };

  const productImagesHandler = (files) => {
    console.log(files);
    if (files.length > 0) {
      setProduct((pro) => {
        return {
          ...pro,
          images: files,
        };
      });
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      product.images,
      result.source.index,
      result.destination.index
    );
    setProduct({
      ...product,
      images: items,
    });
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: '100%',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <Grid container spacing={4}>
      <Grid item md={8} xs={12}>
        <Grid container direction="column" spacing={1}>
          {/* title */}
          <Grid item>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
              }}
              placeholder={t['Add Product Title For Creative Market']}
              required
              value={product.title}
              onChange={(e) =>
                setProduct((pro) => {
                  return {
                    ...pro,
                    title: e.target.value,
                  };
                })
              }
            />
          </Grid>
          {/* Shopname */}
          <Grid item>
            <Typography variant="h6">
              {t['by']}{' '}
              <span style={{ color: theme.palette.common.primary }}>
                {shop?.shopName}
              </span>{' '}
              {t['in']}
            </Typography>
          </Grid>
          {/* Category */}
          <Grid item>
            <TextField
              select
              variant="outlined"
              size="small"
              inputProps={{
                placeholder: t['Choose Category'],
              }}
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutlineNoBorder,
                },
              }}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                },
              }}
              required
              value={product.productCategory}
              onChange={(e) =>
                setProduct((pro) => {
                  return {
                    ...pro,
                    productCategory: e.target.value,
                  };
                })
              }
              style={{ minWidth: '10em' }}
            >
              <MenuItem value="Choose Category" className={classes.label}>
                {t['Choose Category']}
              </MenuItem>
              {categories.map((item) => (
                <MenuItem
                  key={item.name}
                  value={item.name}
                  className={classes.label}
                >
                  {' '}
                  {item.name}{' '}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* images */}
          <Grid item>
            <Grid container spacing={1}>
              {/* For input image */}
              <Grid item md={10} xs={12} style={{ height: '100%' }}>
                {product.images[0] ? (
                  <img
                    src={URL.createObjectURL(product.images[0])}
                    style={{ width: '100%', height: '400px' }}
                  />
                ) : (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    spacing={1}
                    style={{
                      padding: '2em',
                      border: '4px dashed rgba(0, 0, 0, 0.12)',
                      borderRadius: '4px',
                      height: '400px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const dropzone = document.getElementById('dropzone');
                      if (dropzone) {
                        dropzone.click();
                      }
                    }}
                  >
                    <Grid item>
                      <WallpaperIcon
                        style={{
                          fontSize: '6rem',
                          fill: theme.palette.common.darkBlack,
                          opacity: 0.8,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" align="center">
                        {t['Drag and drop here to upload your screenshot(s)']}
                      </Typography>
                      <Typography
                        align="center"
                        paragraph
                        style={{ fontWeight: 300, fontSize: '0.8rem' }}
                      >
                        {t['1820 x 1214px ideal for hi-res']}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          backgroundColor: 'transparent',
                          padding: '5px 30px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            color: theme.palette.common.primary,
                            borderColor: theme.palette.common.primary,
                          }}
                        >
                          {t['or Select files']}
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {/* for video */}
                <div>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{
                      //color: 'gray',
                      opacity: 0.8,
                      marginTop: '-0.9em',
                      marginBottom: '0.2em',
                    }}
                  >
                    <span style={{ backgroundColor: '#fff' }}>
                      {' '}
                      --------- {t['OR']} ---------
                    </span>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputProps={{
                      classes: {
                        root: classes.input,
                        notchedOutline: classes.inputOutline,
                      },
                    }}
                    placeholder={t['Enter Youtube or Vimeo URL']}
                    value={product.videoUrl}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ marginTop: '1em' }}>
                  {' '}
                  <SunEditor
                    placeholder={t['Please Enter Product Details...']}
                    setContents={product.details}
                    onChange={(content) =>
                      setProduct((pro) => {
                        return {
                          ...pro,
                          details: content,
                        };
                      })
                    }
                  />
                </div>
              </Grid>
              {/* For preview  */}
              <Grid item md={2} xs={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={1}
                >
                  {/* DropZone items */}
                  <Grid item style={{ width: '100%' }}>
                    <DropzoneArea
                      classes={{
                        icon: classes.hide,
                        root: classes.dropzoneRoot,
                        text: classes.dropZoneTextContainer,
                      }}
                      inputProps={{
                        id: 'dropzone',
                      }}
                      id="dropzone"
                      showAlerts={false}
                      filesLimit={8}
                      showPreviewsInDropzone={false}
                      //acceptedFiles={['image/*']}
                      dropzoneText={
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          direction="column"
                          style={{ padding: '0.3em' }}
                        >
                          <Grid item>
                            <BackupIcon
                              style={{
                                fontSize: '2rem',
                                fill: theme.palette.common.darkBlack,
                                opacity: 0.8,
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography className={classes.label}>
                              {t['Drag or click to upload product']}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                      onChange={(files) => productImagesHandler(files)}
                    />
                  </Grid>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided, snapshot) => (
                        <div
                          className="characters"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          // style={{ width: '100%' }}
                        >
                          {product.images.map((item, i) => (
                            <Draggable key={i} draggableId={i + ''} index={i}>
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
                                  <Grid
                                    item
                                    key={i}
                                    xs={12}
                                    style={{
                                      width: '100%',
                                      position: 'relative',
                                    }}
                                  >
                                    <img
                                      src={URL.createObjectURL(item)}
                                      style={{
                                        width: '100%',
                                        height: '90px',
                                      }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        handleImageDeleteHandler(i)
                                      }
                                      style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        backgroundColor: '#fff',
                                        color: theme.palette.common.primary,
                                      }}
                                    >
                                      <DeleteIcon size="small" />
                                    </IconButton>
                                  </Grid>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {/* {product.imagesData.map((item, i) => (
                    <Grid
                      item
                      key={i}
                      xs={12}
                      style={{ width: '100%', position: 'relative' }}
                    >
                      <img
                        src={URL.createObjectURL(item)}
                        style={{ width: '100%', height: '90px' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleImageDeleteHandler(i, 'new')}
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: '#fff',
                          color: theme.palette.common.primary,
                        }}
                      >
                        <DeleteIcon size="small" />
                      </IconButton>
                    </Grid>
                  ))} */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Product description */}
          <Grid item style={{ marginTop: '1em' }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
              }}
              placeholder={t['Add Product Description For Creative Market']}
              required
              value={product.description}
              onChange={(e) =>
                setProduct((pro) => {
                  return {
                    ...pro,
                    description: e.target.value,
                  };
                })
              }
            />
          </Grid>

          {/* Divider */}
          <Grid item style={{ marginTop: '1em' }}>
            <Divider />
          </Grid>
          {/* SEO card */}
          <Grid item style={{ marginTop: '1em' }}>
            <Typography variant="h2">
              {t['Customize Your Search Engine Listing']}
            </Typography>
            <Paper elevation={4} style={{ padding: '1em' }}>
              <Typography
                className={classes.label}
                style={{ color: theme.palette.common.primary }}
              >
                {product.title.length > 0
                  ? product.title
                  : t['Your Product Name']}{' '}
                | {t['Creative Market']}
              </Typography>
              <Typography className={classes.label}>
                https://creativemarket.com/{shop.shopName}/
                {product.title.length > 0
                  ? product.title
                  : t['your-product-name']}
              </Typography>
              <Typography variant="subtitle2">
                {product.description > 0
                  ? product.description
                  : t['Search engine autoomatically generate a description.']}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} xs={12}>
        <Grid container direction="column">
          {/* Actual file */}
          <Grid item>
            <DropzoneArea
              classes={{
                icon: classes.hide,
                root: classes.dropzoneRoot,
              }}
              filesLimit={1}
              showPreviewsInDropzone={false}
              showAlerts={false}
              //acceptedFiles={['image/*']}
              dropzoneText={
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  spacing={1}
                >
                  <Grid item>
                    <BackupIcon
                      style={{
                        fontSize: '3rem',
                        fill: theme.palette.common.darkBlack,
                        opacity: 0.8,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      {t['Drag or click to upload product']}
                    </Typography>
                    <Typography
                      paragraph
                      style={{ fontWeight: 300, fontSize: '0.8rem' }}
                    >
                      {t['Attach only files for sale. 4GB max']}
                    </Typography>
                  </Grid>
                </Grid>
              }
              onChange={(files) =>
                setProduct((pro) => {
                  return {
                    ...pro,
                    file: files[0],
                  };
                })
              }
            />
          </Grid>
          {product.file && product.file !== '' && (
            <Grid item style={{ marginTop: '0.8em' }}>
              <Typography className={classes.label} align="center">
                <Chip
                  label={product.file.name}
                  //label={product.file}
                  onDelete={() =>
                    setProduct({
                      ...product,
                      file: '',
                      fileData: null,
                    })
                  }
                />
              </Typography>
            </Grid>
          )}
          {product.fileData && product.fileData !== null && (
            <Grid item style={{ marginTop: '0.8em' }}>
              <Typography className={classes.label} align="center">
                <Chip
                  label={product.fileData.name}
                  onDelete={() =>
                    setProduct({
                      ...product,
                      file: '',
                      fileData: null,
                    })
                  }
                />
              </Typography>
            </Grid>
          )}
          {/* Licence Price */}
          <Grid
            item
            style={{
              marginTop: '1em',
            }}
          >
            <Grid
              container
              direction="column"
              style={{
                padding: '1em',
                border: `1px solid rgb(0 0 0 / 12%)`,
                borderRadius: '4px',
                borderTop: `4px solid ${theme.palette.common.primary}`,
              }}
              component={Card}
            >
              <Grid item container justify="space-between">
                <Typography variant="h6" style={{ fontWeight: '700' }}>
                  {t['License prices']}
                </Typography>
                {/* <Typography
                      paragraph
                      style={{ fontWeight: 300, fontSize: '0.8rem' }}
                    >
                      Attach only files for sale. 4GB max
                    </Typography> */}
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                alignItems="flex-end"
                wrap="nowrap"
              >
                <Typography className={classes.label}>
                  {t['Personal']}
                </Typography>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.label,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography className={classes.label}>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  className={classes.label}
                  required
                  value={product.personalLicence}
                  onChange={(e) =>
                    setProduct((pro) => {
                      return {
                        ...product,
                        personalLicence: e.target.value,
                      };
                    })
                  }
                />
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                alignItems="flex-end"
                wrap="nowrap"
              >
                <Typography className={classes.label}>
                  {t['Commercial']}
                </Typography>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.label,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography className={classes.label}>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  className={classes.label}
                  required
                  value={product.commercialLicence}
                  onChange={(e) =>
                    setProduct((pro) => {
                      return {
                        ...pro,
                        commercialLicence: e.target.value,
                      };
                    })
                  }
                />
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                alignItems="flex-end"
                wrap="nowrap"
              >
                <Typography className={classes.label}>
                  {t['Extended Commercial']}
                </Typography>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.label,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography className={classes.label}>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  className={classes.label}
                  required
                  value={product.extendedCommercialLicence}
                  onChange={(e) =>
                    setProduct((pro) => {
                      return {
                        ...product,
                        extendedCommercialLicence: e.target.value,
                      };
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Compatible with */}
          <Grid
            item
            style={{
              marginTop: '1em',
            }}
          >
            <Grid
              container
              direction="column"
              style={{
                border: `1px solid ${theme.palette.common.darkBlack}`,
                borderRadius: '4px',
              }}
              component={Card}
            >
              {/* For date */}
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                style={{ padding: '1em' }}
              >
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: '400',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CalendarTodayIcon
                    fontSize="small"
                    style={{ marginRight: '6px' }}
                  />{' '}
                  {t['Date']}
                </Typography>
                <Typography variant="h6" style={{ fontWeight: '400' }}>
                  {new Date().toDateString()}
                </Typography>
              </Grid>
              <Divider />
              {/* compatible with */}
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                style={{ padding: '1em 1em 0 1em' }}
              >
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: '400',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <EventNoteIcon
                    fontSize="small"
                    style={{ marginRight: '6px' }}
                  />{' '}
                  {t['Compatible with']}
                </Typography>
                <Typography variant="h6" style={{ fontWeight: '400' }}>
                  <TextField
                    select
                    className={classes.select}
                    value={product.compatibleWith}
                    onChange={(e) =>
                      setProduct((pro) => {
                        return {
                          ...pro,
                          compatibleWith: e.target.value,
                        };
                      })
                    }
                    SelectProps={{
                      multiple: true,

                      renderValue: () => (
                        <Typography className={classes.label}>
                          {' '}
                          Select{' '}
                        </Typography>
                      ),
                      IconComponent: (props) => (
                        <div style={{ marginRight: '0.5em' }}>
                          {' '}
                          <KeyboardArrowDownIcon {...props} />
                        </div>
                      ),
                      MenuProps: {
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                        input: classes.inputRoot,
                      },
                    }}
                  >
                    {' '}
                    {compatibleList.map((x, i) => (
                      <MenuItem key={i} value={x} className={classes.label}>
                        {x}
                      </MenuItem>
                    ))}
                  </TextField>
                </Typography>
              </Grid>
              {/* comatible item lists */}
              <Grid
                item
                container
                spacing={1}
                alignItems="center"
                style={{ padding: '0.5em 1em' }}
              >
                {product.compatibleWith.map((t, i) => (
                  <Grid item key={i}>
                    <Chip
                      label={t}
                      onDelete={() => handlecompatibleWithDelete(i)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              {/* Other properties */}
              <Grid
                item
                container
                direction="column"
                spacing={1}
                style={{ padding: '1em' }}
              >
                {/* layered with */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: '400',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LayersIcon
                      fontSize="small"
                      style={{ marginRight: '6px' }}
                    />{' '}
                    {t['Layered']}
                  </Typography>
                  <FormControlLabel
                    style={{ marginRight: 0 }}
                    control={
                      <Checkbox
                        checked={product.layered}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            layered: e.target.checked,
                          });
                        }}
                        name="layered"
                        style={{
                          color: theme.palette.common.primary,
                        }}
                      />
                    }
                    label={
                      <Typography variant="h6" style={{ fontWeight: '400' }}>
                        {product.layered ? t['Yes'] : t['No']}
                      </Typography>
                    }
                  />
                </Grid>
                {/* vector */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: '400',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <DynamicFeedIcon
                      fontSize="small"
                      style={{ marginRight: '6px' }}
                    />{' '}
                    {t['Vector']}
                  </Typography>
                  <FormControlLabel
                    style={{ marginRight: 0 }}
                    control={
                      <Checkbox
                        checked={product.vector}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            vector: e.target.checked,
                          });
                        }}
                        name="vector"
                        style={{
                          color: theme.palette.common.primary,
                        }}
                      />
                    }
                    label={
                      <Typography variant="h6" style={{ fontWeight: '400' }}>
                        {product.vector ? t['Yes'] : t['No']}
                      </Typography>
                    }
                  />
                </Grid>
                {/* tileable */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: '400',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <TitleIcon
                      fontSize="small"
                      style={{ marginRight: '6px' }}
                    />{' '}
                    {t['Tileable']}
                  </Typography>
                  <FormControlLabel
                    style={{ marginRight: 0 }}
                    control={
                      <Checkbox
                        checked={product.tileable}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            tileable: e.target.checked,
                          });
                        }}
                        name="tileable"
                        style={{
                          color: theme.palette.common.primary,
                        }}
                      />
                    }
                    label={
                      <Typography variant="h6" style={{ fontWeight: '400' }}>
                        {product.tileable ? t['Yes'] : t['No']}
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* tags */}
          <Grid
            item
            style={{
              marginTop: '1em',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    classes: {
                      root: classes.input,
                      notchedOutline: classes.inputOutline,
                    },
                  }}
                  placeholder={t['Type a tag and press enter..']}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={setProductTags}
                />
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  {product.tags.map((t, i) => (
                    <Grid item key={i}>
                      <Chip label={t} onDelete={() => handleTagDelete(i)} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
