import React from 'react';
import { FormControl, FormLabel, Grid, TextField, ThemeProvider } from '@material-ui/core';
import { useForm, Form } from '../components/useForm';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import { connect } from 'react-redux';
import * as actions from '../actions/AContact';
import { v4 as uuidv4 } from 'uuid';


const generateUUID = () => {
    return uuidv4();
}


const initialValues = {
    id: generateUUID(),
    fullName: '',
    address: {
        city: '',
        street: '',
        houseNumber: '',
    },
    dateOfBirth: new Date(),
    phoneNumbers: []
}

const ContactForm = (props) => {

    const validate = (fieldValues = values) => {
        let temp = {}
        if ('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        }
        if ('city' in fieldValues) {
            temp.city= fieldValues.city ? "" : "This field is required."
        }
        if ('street' in fieldValues) {
            temp.street = fieldValues.street ? "" : "This field is required."
        }
        if ('houseNumber' in fieldValues) {
            temp.houseNumber = fieldValues.houseNumber ? "" : "This field is required."
        }
        if ('dateOfBirth' in fieldValues) {
            temp.dateOfBirth = fieldValues.dateOfBirth ? "" : "This field is required."
        }
        
        setErrors({
            ...errors,
            ...temp
        })
        
        if (fieldValues == values) {
            return Object.values(temp).every(x => x=="")
        }

        

    }

    const validateSubmit = () => {
        let temp = {}
        temp.fullName = values.fullName ? "" : "This field is required."
        temp.city= values.address.city ? "" : "This field is required."
        temp.street = values.address.street ? "" : "This field is required."
        temp.houseNumber = values.address.houseNumber ? "" : "This field is required."
        temp.dateOfBirth = values.dateOfBirth ? "" : "This field is required."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x=="");
    }

    const{values, setValues, errors, setErrors, handleInputChange} = useForm(initialValues, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if(validateSubmit()) {
            window.alert('validation succeeded')
            props.createContact(values, console.log(values.address));
        }
        
    }

    const handleInputChangeAddress = e => {
        
        const {name, value} = e.target;
        const fieldValue = { [name]: value}
        
        setValues({
            ...values,
            address: {
                ...values.address,
                ...fieldValue
            }
        })
        validate(fieldValue)
    }

    const handleInputChangeDate = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value.toLocaleDateString()
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField 
                     variant="outlined"
                     label="Full Name"
                     name="fullName"
                     value={values.fullName}
                     onChange={handleInputChange}
                     {...(errors.fullName && {error:true, helperText:errors.fullName})}
                     />
                    <TextField 
                     variant="outlined"
                     label="City"
                     name='city'
                     value={values.address.city}
                     onChange={handleInputChangeAddress}
                     {...(errors.city && {error:true, helperText:errors.city})}/>
                    <TextField 
                     variant="outlined"
                     label="Street"
                     name="street"
                     value={values.address.street}
                     onChange={handleInputChangeAddress}
                     {...(errors.street && {error:true, helperText:errors.street})}/>
                    <TextField 
                     variant="outlined"
                     label="House Number"
                     name="houseNumber"
                     value={values.address.houseNumber}
                     onChange={handleInputChangeAddress}
                     {...(errors.houseNumber && {error:true, helperText:errors.houseNumber})}/>
                    <DatePicker
                     name="dateOfBirth"
                     label="Date of birth"
                     value={values.dateOfBirth}
                     onChange={handleInputChangeDate}
                     {...(errors.dateOfBirth && {error:true, helperText:errors.dateOfBirth})}/>
                    <div>
                        <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        text="Submit"
                        type="submit" />
                        <Button
                        variant='contained'
                        color='default'
                        size='large'
                        text="Reset" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

const mapStateToProps = state => ({
    contactList: state.RContact.list,
})

const mapActionToProps = {
    createContact: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(ContactForm);
