# Description
Chatrooms - Django Project
- Develop an asynchronous chatroom service using Django and the channels package
- Deploy a simple chat app to Heroku with Daphne
- Develop a React chat application for integration with Django/channels Heroku deployment

# Demo
- Django Application - http://dchat-bk.herokuapp.com/chat/{chatroom-name}/

## Screenshots


## Specifications
- Theory - Websockets, ASGI, Channels
- Real live chat (multiple users)
- User Registration
- Track conversation and users in chat
- Record/save conversations
- Delete/edit messages
- Working asynchronous web chat client with Django
- Add configuration for Daphne/Channels/Redis
- Basic deploy wit Heroku (http only)
- Build a proof of concept React app
- Deploy React to Heroku
- Deploy Django Channels Chat Server and Redis to Heroku


## Notes
### Synchronous Vs Asynchronous
- Django/Webpages mostly synchronous
    - Web Synchronous request (HTTP request)
    - send request --> stop executing --> wait for reply
    - HTTP 200 or HTTP 404 etc. (or timeout)

- Asynchrounous
    - Make request "launch" the request 
    - Forget about it --> carry on executing tasks
    - Define/create a callback function

### WebSocket's (WS)
- Bi-directional protocol: server and client pushing messages at any time
- Full-duplex communication: client and server can talk to each other independently at the same time
- Supported by most/all browsers
- Secured WebSocket's (WSS)
- WS - Everyone can now send/receive messages (real-time)

### Django-Channels
- As every client has a reply_channel
- Keep track of user in a connected list
- Chat app --> multiple users (one room)
- Channels uses Groups
    - Add user's channel into group

### Process
- Install Django Channels
- Create Django templates/views
- Channels Routing
- Consumer (view)
- Template configuration handle WS


## Heroku Configurations

### Set Github Repository for Heroku Git Also
`heroku git:remote -a dchat-bk`

### Clone the repository
Use Git to clone dchat-bk's source code to your local machine.
`$ heroku git:clone -a dchat-bk`
`$ cd dchat-bk`

### Deploy your changes to Heroku
`$ git push heroku master`

### Check Heroku Logs
`heroku logs --app <application name> -t`


## ReactJS Application Setup
- `npx create-react-app chatui`
- Install material-ui - `npm install @material-ui/core`


## Network Communication
### Communication over network
User A --HTTP Request--> WSGI (Apache/Nginx) --> Django Views

User A --WebSocket's--> ASGI (Daphine) --> Consumer

User A --> ASGI Server --> Consumer (View)

## References
- https://channels.readthedocs.io/
- https://channels.readthedocs.io/en/latest/deploying.html
- https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/daphne/
- https://devcenter.heroku.com/articles/heroku-redis