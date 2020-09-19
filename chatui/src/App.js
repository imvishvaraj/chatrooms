import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', //fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        boxShadow: 'none',
    }
});

class App extends Component {

  state = {
    isLoggedIn: false,
    message: [],
    value: '',
    username: '',
    room: 'general',
  }

//   client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/');
client = new W3CWebSocket('ws://dchat-bk.herokuapp.com/ws/chat/' + this.state.room + '/');

  onButtonClicked = (e) => {
      this.client.send(JSON.stringify({
          type: 'message',
          message: this.state.value,
          username: this.state.username
      }));

      // once message is sent, remove it from input box
      this.state.value='';
      e.preventDefault();
  }

  componentDidMount() {
      this.client.onopen = () => {
          console.log('WebSocket Client Connected!')
      };
      this.client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer.type);
        if ( dataFromServer ) {
            this.setState((state) => ({
                message: [...state.message, 
                {
                    msg: dataFromServer.message,
                    username: dataFromServer.username,
                }]
            }));
        }
      }
  }

  render() {
    const { classes } = this.props;
    
    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                {this.state.isLoggedIn ? 
                    <div style={{ marginTop: 50, }}>
                        Room Name: {this.state.room}
                        <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
                            {this.state.message.map(message => 
                                <> 
                                <Card className={classes.root}>
                                    <CardHeader avatar={
                                        <Avatar className={classes.avatar}>
                                            R
                                        </Avatar>
                                        
                                    }
                                    title={message.username}
                                    subheader={message.msg}
                                    />
                                </Card>
                                {/* <p>{message.username}: {message.msg}</p> */}
                                </>
                            )}
                        </Paper>

                        <form className={classes.form} noValidate onSubmit={this.onButtonClicked}>
                            <TextField 
                            id='outlined-helperText'
                            label='Make a comment'
                            defaultValue='Default Value'
                            variant='outlined'
                            value={this.state.value}
                            fullWidth
                            onChange= { e => {
                                this.setState({ value: e.target.value });
                                this.value = this.state.value;
                            } }
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                Start Chatting
                            </Button>
                        </form>
                    </div> 
                
                : 
                    <div>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component='h1' variant='h5'>
                                Chatrooms
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={value => this.setState({isLoggedIn: true})}>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Chatroom Name'
                                    name='Chatroom Name'
                                    autoFocus
                                    value={this.state.room}
                                    onChange={e => {
                                        this.setState({ room: e.target.value });
                                        this.value = this.state.room;
                                    }}
                                />
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='Username'
                                    label='Username'
                                    name='Username'
                                    autoFocus
                                    value={this.state.username}
                                    onChange={e => {
                                        this.setState({ username: e.target.value });
                                        this.value = this.state.username;
                                    }}
                                />
                                <Button 
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                >
                                    Start Chatting
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href='#' variant='body2'>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </form>
                        </div>
                    </div> 
                }
            </Container>
        </React.Fragment>

    )
  }
}

export default withStyles(useStyles)(App);
