import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react';
import Button from '../components/Button';

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props
    return (
        <Dialog open={openPopup} maxWidth="xs">
            <DialogTitle>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow:1}}>Add New Contact</div>
                    <Button 
                    text="X"
                    color="secondary"
                    variant="contained"
                    onClick={() => setOpenPopup(false)}/>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
