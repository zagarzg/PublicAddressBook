import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues, validate) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValue = { [name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    };
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
        <form className={classes.root} onSubmit={props.onSubmit} autoComplete="off">
            {props.children}
        </form>
    )    
}
