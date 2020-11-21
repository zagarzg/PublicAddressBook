import React, { useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TablePagination, TableRow, TableCell, TableContainer, TableHead, Table, ButtonGroup, IconButton, TableSortLabel, TextField} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions/AContact';
import ContactForm from '../pages/ContactForm'
import  { RContact }  from '../reducers/RContact';
import Button from '../components/Button';
import  AddIcon from '@material-ui/icons/Add';
import  EditIcon from '@material-ui/icons/Edit';
import  DeleteIcon from '@material-ui/icons/Delete';
import Popup from '../components/Popup'
import Notification from '../components/Notification'
import ConfirmDialog from '../components/ConfirmDialog';
import { Pagination } from '@material-ui/lab';

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
    search: {
        width: '70%', 
        margin:'10px'
    },    
    addButton: {
        margin: '20px'
    },
    pagination: {
        margin:'20px 400px'
    }
    
}))

const Contacts = (props) => {

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false)
    const [contactForEdit, setContactForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:'', subTitle:''})

    const pages = [5, 10, 25];
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('FullName');
    const [filter, setFilter] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        props.fetchAllContacts(page, rowsPerPage)
        console.log(props.pagination)
    }

    useEffect(() => {
        props.fetchAllContacts(page, rowsPerPage, order, orderBy, filter);
        console.log(props.pagination)
    },[page, orderBy, order, filter])

    const addOrUpdateContact = (contact, resetForm) => {

        // console.log(props.contactList.filter(e => e.id == contact.id).length > 0)

        if (!(props.contactList.filter(e => e.id == contact.id).length > 0)) {
            props.createContact(contact)
            props.fetchAllContacts(page, rowsPerPage);
        }
        else {
            props.updateContact(contact)
        }
        
        resetForm();
        setContactForEdit(null)
        setOpenPopup(false);
        setNotify({
            isOpen: true,
            message: 'Submitted successfully',
            type: 'success'
        })
    }

    const openInPopup = contact => {
        setContactForEdit(contact)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        props.deleteContact(id);
        setNotify({
            isOpen: true,
            message: 'Deleted successfully',
            type: 'error'
        })
    }

    const handleSort = orderRequest => {
        const isAsc = orderBy === orderRequest && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(orderRequest);
    }

    const handleSearch = e => {
        setFilter(e.target.value)
    }

   

        return (
            <>
            <Paper className={classes.pageContent}>
                <TextField
                variant="outlined"
                label="Search Contacts"
                name="search"
                onChange={handleSearch}
                className={classes.search}/>
                <Button 
                className={classes.addButton}
                text="Add New Contact"
                color="primary"
                variant="outlined"
                startIcon= {<AddIcon />}
                onClick= {() => setOpenPopup(true)}/>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel 
                                     active={orderBy === 'FullName'}
                                     direction={orderBy === 'FullName' ? order : 'asc'}
                                     onClick={() => { handleSort('FullName')}}>
                                        Full Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                     active={orderBy === 'City'}
                                     direction={orderBy === 'City' ? order : 'asc'}
                                     onClick={() => { handleSort('City')}}>
                                        City
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                     active={orderBy === 'Street'}
                                     direction={orderBy === 'Street' ? order : 'asc'}
                                     onClick={() => { handleSort('Street')}}>
                                        Street
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    House Number
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel>
                                        Date of Birth
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.contactList !== 'undefined' ?
                            props.contactList.map(contact => 
                                (<TableRow key={contact.id}>
                                    <TableCell>
                                            {contact.fullName}
                                    </TableCell>
                                    <TableCell>
                                            {contact.address.city}
                                    </TableCell>
                                    <TableCell>
                                            {contact.address.street}
                                    </TableCell>
                                    <TableCell>
                                            {contact.address.houseNumber}
                                    </TableCell>
                                    <TableCell>
                                            {contact.dateOfBirth}
                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <IconButton>
                                                <EditIcon color="primary" onClick={() => openInPopup(contact)}/>
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon color="secondary" onClick={() => 
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this contact',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => onDelete(contact.id)
                                                    })}/>
                                            </IconButton>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>)) : <div>Loading...</div>
                            } 
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={pages}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={props.pagination["TotalCount"]}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> */}
                <Pagination 
                 className={classes.pagination}
                 defaultPage={1}
                 count={props.pagination.TotalPages}
                 onChange={handleChangePage}/>    
            </Paper>
            <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
                <ContactForm 
                contactForEdit = {contactForEdit}
                addOrUpdateContact = {addOrUpdateContact}/>
            </Popup>
            <Notification 
            notify={notify}
            setNotify={setNotify}/>
            <ConfirmDialog 
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}/>
            </>
        )
    
    
}

const mapStateToProps = state => ({
    contactList: state.RContact.list,
    pagination: state.RContact.pagination
    
})

const mapActionToProps = {
    fetchAllContacts: actions.fetchAll,
    createContact: actions.create,
    deleteContact: actions.Delete,
    updateContact: actions.update
    
}

export default connect(mapStateToProps, mapActionToProps)(Contacts);
