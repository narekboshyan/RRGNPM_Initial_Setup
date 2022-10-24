import { Card, Grid } from '@material-ui/core';
import clsx from 'clsx';
import CircularLoading from 'components/shared/Loading';
import { FETCH_LOADING_TEXT } from 'constants/index';
import React from 'react';
import { Link } from 'react-router-dom';

const CardPrice = ({ route, loading, className, cardText, icon, price }) => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Link to={route}>
        <Card className="card-box border-0 card-shadow-first p-4 mb-4">
          <CircularLoading text={FETCH_LOADING_TEXT} open={loading} fullScreen={false} />
          <div className="d-flex align-items-center">
            <div
              className={clsx(
                'd-40 rounded-circle text-white text-center font-size-lg mr-3',
                className
              )}
            >
              {icon}
            </div>
            <div className="text-black-50">{cardText}</div>
          </div>
          <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
            {price}
          </div>
        </Card>
      </Link>
    </Grid>
  );
};

export default CardPrice;
