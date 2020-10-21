import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues) {

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        handleInputChange
    }
}



const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyle();

    return (
        <form className={classes.root} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )    
}
