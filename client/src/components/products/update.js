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

  const categoryRef = React.useRef(null);

  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const [shop, setShop] = useState(shopData);
  const [tag, setTag] = useState();

  resetServerContext();

  useEffect(() => {
    //Here we have to find shop id and shopname (if shop is pending navigate to shop page)
    if (!shop.shopStatus) {
      router.push('/partner');
    }
  }, []);

  const setProductTags = (e) => {
    if (e.keyCode == 13 && tag !== '') {
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
    let deletedImages = [];
    const newImages = images.filter((item, i) => {
      if (i === index && item.new === false) {
        deletedImages.push(item.img);
      }
      return i !== index;
    });
    setProduct({
      ...product,
      images: newImages,
      deletedImages: deletedImages,
    });

    console.log(product.images);
  };

  const productImagesHandler = (files) => {
    if (files.length > 0) {
      setProduct((pro) => {
        return {
          ...pro,
          images: files.map((x) => {
            return {
              img: x,
              new: true,
            };
          }),
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
    <>
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
              </Typography>
            </Grid>

            {/* images */}
            <Grid item>
              <Grid container spacing={1}>
                {/* For input image */}
                <Grid item md={10} xs={12} style={{ height: '100%' }}>
                  {product.images[0] ? (
                    <img
                      src={
                        product.images[0].new === true
                          ? URL.createObjectURL(product.images[0].img)
                          : product.images[0].img
                      }
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
                                        src={
                                          item.new === true
                                            ? URL.createObjectURL(item)
                                            : item.img
                                        }
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
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid container direction="column">
            {/* Description  */}
            <Grid item>
              <TextField
                variant="outlined"
                multiline
                minRows={6}
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
            {/*  Price */}
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
                    {t['Price']}
                  </Typography>
                </Grid>
                {/* Product Price */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="flex-end"
                  wrap="nowrap"
                >
                  <Typography className={classes.label}>
                    {t['Product Price']}
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
                    value={product.price}
                    onChange={(e) =>
                      setProduct((pro) => {
                        return {
                          ...product,
                          price: e.target.value,
                        };
                      })
                    }
                  />
                </Grid>
                {/* Delivery Charges */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="flex-end"
                  wrap="nowrap"
                >
                  <Typography className={classes.label}>
                    {t['Delivery Charges']}
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
                    value={product.deliveryPrice}
                    onChange={(e) =>
                      setProduct((pro) => {
                        return {
                          ...product,
                          deliveryPrice: e.target.value,
                        };
                      })
                    }
                  />
                </Grid>
                {/* unit */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="flex-end"
                  wrap="nowrap"
                >
                  <Typography className={classes.label}>
                    {t['Unit(if any)']}
                  </Typography>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.label,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            style={{ visibility: 'hidden' }}
                            className={classes.label}
                          >
                            $
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    className={classes.label}
                    required
                    value={product.unit}
                    onChange={(e) =>
                      setProduct((pro) => {
                        return {
                          ...pro,
                          unit: e.target.value,
                        };
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Category  */}
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
                {/* category  */}
                <Grid
                  item
                  container
                  justify="space-between"
                  alignItems="center"
                  style={{ padding: '1em 1em 1em 1em' }}
                >
                  <div onClick={() => categoryRef.current.focus()}>
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
                      {t['Choose Category']}
                    </Typography>
                  </div>

                  <Typography variant="h6" style={{ fontWeight: '400' }}>
                    <TextField
                      select
                      className={classes.select}
                      value={product.productCategory}
                      onChange={(e) =>
                        setProduct((pro) => {
                          return {
                            ...pro,
                            productCategory: e.target.value,
                          };
                        })
                      }
                      SelectProps={{
                        renderValue: () => (
                          <Typography className={classes.label}> </Typography>
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

                        inputRef: categoryRef,
                        classes: {
                          input: classes.inputRoot,
                        },
                      }}
                    >
                      {' '}
                      <MenuItem value="" className={classes.label}>
                        {t['Choose Category']}
                      </MenuItem>
                      {categories.map((item, i) => (
                        <MenuItem
                          key={item.name}
                          value={item.name}
                          className={classes.label}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Typography>
                </Grid>
                {/* productCategory item  */}
                {product.productCategory !== '' && (
                  <Grid
                    item
                    container
                    spacing={1}
                    alignItems="center"
                    style={{ padding: '0.5em 1em' }}
                  >
                    <Grid item>
                      <Chip
                        label={product.productCategory}
                        onDelete={() =>
                          setProduct((pro) => {
                            return {
                              ...pro,
                              productCategory: '',
                            };
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}
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
      <Grid container direction="column">
        {/* Divider */}
        <Grid item style={{ marginTop: '1em' }}>
          <Divider />
        </Grid>
        {/* for sun editor */}
        <Grid item style={{ marginTop: '1em' }}>
          {' '}
          <SunEditor
            mode="classic"
            setOptions={{
              katex: 'window.katex',
              buttonList: [
                [
                  'undo',
                  'redo',
                  'font',
                  'fontSize',
                  'formatBlock',
                  'paragraphStyle',
                  'blockquote',
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                  'fontColor',
                  'hiliteColor',
                  'textStyle',
                  'removeFormat',
                  'outdent',
                  'indent',
                  'align',
                  'horizontalRule',
                  'list',
                  'lineHeight',
                  'table',
                  'link',
                  'image',
                  'video',
                  'math',
                  'imageGallery',
                  'fullScreen',
                  'codeView',
                ],
              ],
            }}
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
              https://creativemarket.com/{shop.shopName.replace(' ', '-')}/
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
      <style>
        {`
          .se-wrapper-inner {
            min-height: 300px !important;
          }
        `}
      </style>
    </>
  );
}
