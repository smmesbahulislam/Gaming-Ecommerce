import React from 'react'
import { makeStyles } from '@mui/styles';
import { Typography, Slider } from '@mui/material';
// import Slider from '@mui/material';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    thumb: {
        color: '#000',
    },
    rail: {
        color: `rgba(0,0,0,0.26)`,
    },
    track: {
        color: '#000',
    },
});

const PriceSlider = ({ value, changedPrice }) => {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ width: '100%' }}>
            <Slider
                value={value}
                onChange={changedPrice}
                valueLabelDisplay='on'
                min={0}
                max={1000}
                classes={{
                    thumb: classes.thumb,
                    rail: classes.rail,
                    track: classes.track,
                }}
            />
        </div>
    );
};

export default PriceSlider