import React, { useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, TableContainer, TableHead, Table} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions/AContact';
import { RContact } from '../reducers/RContact';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: '#3f51b5',
            backgroundColor: '#FFD27F',
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        },
    },
}))

const Contacts = (props) => {

    const classes = useStyles();

    useEffect(() => {
        props.fetchAllContacts();
    },[])

    return (
        <Paper className={classes.pageContent}>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>House Number</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Phone Numbers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        props.contactList.map(contact => 
                            (<TableRow key={contact.id}>
                                <TableCell>{contact.fullName}</TableCell>
                                <TableCell>{contact.address.city}</TableCell>
                                <TableCell>{contact.address.street}</TableCell>
                                <TableCell>{contact.address.houseNumber}</TableCell>
                                <TableCell>{contact.dateOfBirth}</TableCell>
                            </TableRow>))
                        }    
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

const mapStateToProps = state => ({
    contactList: state.RContact.list
})

const mapActionToProps = {
    fetchAllContacts: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Contacts);
