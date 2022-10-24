import React, { useMemo, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import DateTimePicker from 'components/shared/Fields/DateTimePicker';
import { GET_ORDERS_BY_DATE } from 'graphql/queries/order';
import { useQueryWithOnError } from 'hooks/apollo';
import moment from 'moment';
import { FETCH_LOADING_TEXT, SELECTED_COMPANY, allRolePermissions } from 'constants/index';
import { useSelector } from 'react-redux';
import { getItemFromLocalStorage, numberRounderHandler } from 'utils';
import CircularLoading from 'components/shared/Loading';

const GraphTable = ({ start }) => {
  const { permissions } = useSelector(state => state.permissions);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(new Date().getTime());
  const minDate = new Date().getTime() - 365 * 24 * 60 * 60 * 1000;

  const { data: ordersQueryData, loading: ordersLoading } = useQueryWithOnError(
    GET_ORDERS_BY_DATE,
    {
      fetchPolicy: 'no-cache',
      variables: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        maxPageSize: Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24),
        selectedCompany: getItemFromLocalStorage(SELECTED_COMPANY)
      },
      skip: !permissions.find(p => p === allRolePermissions.getOrders)
    }
  );

  const ordersGraphicData = useMemo(() => ordersQueryData?.getOrdersByDate || [], [
    ordersQueryData
  ]);

  const series = [
    {
      name: 'Quantity',
      type: 'column',
      data: ordersGraphicData.map(od => od.quantity)
    },
    {
      name: 'Sales order',
      type: 'line',
      data: ordersGraphicData.map(od => od.count)
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          reset: false,
          pan: false
        },
        autoSelected: 'zoom'
      }
    },
    stroke: {
      width: [0, 3]
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1]
    },
    labels: ordersGraphicData.map(({ date }) => date),
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        seriesName: 'Linear',
        opposite: true,
        labels: {
          formatter: x => numberRounderHandler(x)
        }
      },
      {
        seriesName: 'Linear',
        labels: {
          formatter: x => numberRounderHandler(x)
        }
      }
    ]
  };

  return (
    <Card className="card-box overflow-visible">
      <CircularLoading text={FETCH_LOADING_TEXT} open={ordersLoading} fullScreen={false} />
      <CardContent className="p-3">
        <Typography className="font-size-lg py-3 font-weight-bold" variant="h6" id="tableTitle">
          Orders Graph
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DateTimePicker
              fullWidth
              placeholder="Start Date"
              label="Start date"
              name="startDate"
              value={new Date(startDate)}
              minDate={new Date(minDate)}
              maxDate={new Date().getTime()}
              onChange={d => setStartDate(d)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DateTimePicker
              fullWidth
              placeholder="End Date"
              label="End Date"
              name="endDate"
              minDate={minDate}
              maxDate={new Date().getTime()}
              value={new Date(endDate)}
              onChange={d => setEndDate(d)}
            />
          </Grid>
        </Grid>
        <ReactApexChart options={options} series={series} type="line" height={400} />
      </CardContent>
    </Card>
  );
};

export default GraphTable;
