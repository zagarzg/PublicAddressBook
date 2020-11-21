import React from 'react'
import { AppBar , Toolbar , Grid, makeStyles, IconButton, Badge, createMuiTheme, ThemeProvider} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles({
    root: {backgroundColor: '#fff'},
    icon: {color: '#ff8c00'},
    badgePrimary: {
        '& .MuiBadge-badge': {
            color: '#3f51b5',
            backgroundColor: '#ff8c00'
        }
    },
    badgeSecondary: {
        '& .MuiBadge-badge': {
            color: '#ff8c00',
            backgroundColor: '#3f51b5'
        }    
    }
})

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item >
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton className={classes.icon}>
                            <Badge badgeContent={4} className={classes.badgePrimary}>
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>      
                        <IconButton className={classes.icon}>  
                            <Badge badgeContent={3} className={classes.badgeSecondary}>
                                <ChatBubbleOutlineIcon />
                            </Badge>
                        </IconButton>
                        <IconButton className={classes.icon}>  
                            <PowerSettingsNewIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
