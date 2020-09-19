import React, { useEffect, useState } from 'react';
// Import css file
import './App.css';
// Import components
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
// Import Pusher
import Pusher from 'pusher-js';
import axios from './axios';
// Import Router DOM
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  const [Messages, setMessages] = useState([])

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The user is >>> ", authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('20a2053a8c5cde2313f8', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...Messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [Messages])

  console.log(Messages);

  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Switch>
            <Route exact path='/'>
              <Sidebar />
              <Chat messages={Messages} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
