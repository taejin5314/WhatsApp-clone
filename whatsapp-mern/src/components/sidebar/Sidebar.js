import React from 'react';
import './Sidebar.css';
import SidebarChat from './sidebarChat/SidebarChat';

import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [{ user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://lh3.googleusercontent.com/KOdMVEe6ILxDfoAr1UcMhaVK4HTAGGC0qvgZDSEQL_PRAuiq2WlNQOSR7cy1MbUqq-sw=s85" />
                <h3>{user ? user.displayName : "Guest"}</h3>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <Link to='/login'>
                            <DonutLargeIcon />
                        </Link>
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <ExitToAppIcon onClick={handleAuthentication} />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
