import React, {useEffect, useState} from "react";
import './Feed.css';
import CreateIcon from "@mui/icons-material/Create";
import InputOption from './InputOption.js'
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalenderViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from './Post.js';
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice.js";
import FlipMove from 'react-flip-move'

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => 
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

  return () => unsubscribe();
},[]);

  const sendPost = (e) =>{
    e.preventDefault();

    db.collection("posts").add({
        name: user.displayName,
        description: user.email,
        message: input, 
        photoUrl: user.photoUrl || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("")
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon/>
          <form>
            <input 
              value={input} 
              onChange={(e)=> setInput(e.target.value)}
              type="text" 
            />
            <button onClick={sendPost} type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
            <InputOption Icon={SubscriptionIcon} title="Video" color="#E7A33E"/>
            <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
            <InputOption Icon={CalenderViewDayIcon} title="Write Article" color="#7FC15E"/>
        </div>
      </div>

      <FlipMove>
        {posts.map(({ id, data: {name, description, message, photoUrl} }) => (
        <Post 
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}
        />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed
