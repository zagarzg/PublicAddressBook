import React from 'react';
import { FormControl, FormLabel, Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../components/useForm';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import { connect } from 'react-redux';
import * as actions from '../actions/AContact';


const initialValues = {
    id: 0,
    fullName: '',
    city: '',
    street: '',
    houseNumber: '',
    dateOfBirth: new Date(),
    phoneNumbers: []
}


const ContactForm = (props) => {

    const{values, setValues, handleInputChange} = useForm(initialValues);

    const handleSubmit = e => {
        e.preventDefault()
        props.createContact(values, ()=>{window.alert('Inserted')});
    }

    const handleInputChangeDate = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value.toISOString()
        })
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                     variant="outlined"
                     label="Full Name"
                     name="fullName"
                     value={values.fullName}
                     onChange={handleInputChange}/>
                    <TextField 
                     variant="outlined"
                     label="City"
                     name="city"
                     value={values.city}
                     onChange={handleInputChange}/>
                    <TextField 
                     variant="outlined"
                     label="Street"
                     name="street"
                     value={values.street}
                     onChange={handleInputChange}/>
                    <TextField 
                     variant="outlined"
                     label="House Number"
                     name="houseNumber"
                     value={values.houseNumber}
                     onChange={handleInputChange}/>
                    <DatePicker
                     name="dateOfBirth"
                     label="Date of birth"
                     value={values.dateOfBirth}
                     onChange={handleInputChangeDate}/>
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
                <Grid item xs xs={6}>
                    <FormControl>
                        <FormLabel></FormLabel>
                    </FormControl>
                </Grid>
            </Grid>
        </Form>
    )
}

const mapStateToProps = state => ({
    contactList: state.RContact.list
})

const mapActionToProps = {
    createContact: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(ContactForm);
