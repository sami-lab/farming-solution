import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Chart = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const salesOptions = [
    { value: 'lastWeekSalesGraph', label: 'Last week Sales', type: 'column' },
    { value: 'lastMonthSalesGraph', label: 'Last month Sales', type: 'spline' },
    { value: 'lastYearSalesGraph', label: 'Last Year Sales', type: 'column' },
  ];
  const [salesOption, setSalesOption] = React.useState(salesOptions[2].value);

  const [chartData, setChartData] = React.useState();

  useEffect(() => {
    const options = {
      animationEnabled: true,
      title: {
        text: salesOptions.find((x) => x.value === salesOption).label,
        fontColor: theme.palette.common.primary,
      },
      axisX: {
        valueFormatString: 'MMM',
      },
      axisY: {
        title: 'Sales (in USD)',
        prefix: '$',
        includeZero: false,
        gridColor: theme.palette.common.primary,
      },
      data: [
        {
          yValueFormatString: '$#,###',
          xValueFormatString: 'MMMM',
          color: theme.palette.common.primary,

          type: salesOptions.find((x) => x.value === salesOption).type,
          dataPoints: props[salesOption],
        },
      ],
    };
    setChartData(options);
  }, [salesOption]);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction={matchesSM ? 'column' : 'row'}
        component={Paper}
        alignItems="center"
        elevation={0}
        justify="space-between"
        className={classes.paper}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  fontFamily: 'SfPro',
                  fontWeight: 'bold',
                }}
              >
                {salesOptions.find((x) => x.value === salesOption).label}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  color: '#0F996D',
                  fontFamily: 'SfPro',
                  fontWeight: 'bold',
                }}
              >
                $ {props[salesOption].reduce((sum, row) => row.y + sum, 0)} USD
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              native
              value={salesOption}
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              onChange={(e) => setSalesOption(e.target.value)}
            >
              {salesOptions.map((it, i) => (
                <option key={i} value={it.value}>
                  {it.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider light style={{ marginBottom: '0.88em' }} />
      <Grid container>
        <CanvasJSChart
          options={chartData}
          style={{ width: '100%' }}
          /* onRef={ref => this.chart = ref} */
        />
      </Grid>
    </Paper>
  );
};
export default Chart;
