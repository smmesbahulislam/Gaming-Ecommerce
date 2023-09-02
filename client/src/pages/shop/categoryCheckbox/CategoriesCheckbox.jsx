import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
    root: {
        '&$checked': {
            color: '#000',
        },
    },
    checked: {},
    wrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '0px',
    },
    label: {
        // fontSize: '.8rem',
        fontFamily: `'Raleway', sans-serif`,
    }
})

const CategoriesCheckbox = ({ category, label, changeChecked }) => {
    const classes = useStyles();
    const { _id } = category;
    return (
        <>
            <FormControlLabel
                classes={{
                    label: classes.label,
                    root: classes.wrap
                }}
                control={
                    <Checkbox
                        classes={{
                            checked: classes.checked,
                            root: classes.root
                        }}
                        size='small'
                        onChange={(e) => changeChecked(e.target.checked, _id)}
                    />
                }
                label={label}
            />
        </>
    )
}

export default CategoriesCheckbox