import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PostServerApi from './API/PostServiceApi'
import Heder from "./Component/Heder";
import SingleBlog from "./Component/SingleBlog";
import AllBlogList from "./Component/AllBlogList";
import { setCounter } from "./redux/actions/counterActions";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(false);
  const [bool, setBool] = useState(false);
  const [voice, setVoice] = useState('');
  // const [fetchPost]  = useFetching(async ()=>{
  //   const data = await PostServerApi.getAllPost()
  //         .catch((e)=>console.log("Error", e.message));
  //   dispatch(setCounter(data));
  // }); 

  useEffect( () => {
    PostServerApi.getAllPost().then((res)=>{
      dispatch(setCounter(res));
    })
    alanBtn({
      key: '89841ef80f04ce0c21c65313bb68d4c92e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getBase') {
          console.log(commandData.data);
        } else if (commandData.command === "mode") {
          setMode(commandData.data);
        } else if (commandData.command === "voice") {
          setVoice(commandData.data);
          setBool(commandData.bool);
        }
      }
    });
  },[dispatch]);

  const AllBlogs = () => {
    return(
      <AllBlogList voice={voice} bool={bool} />
    )
  }

  return (
    <div>
      <BrowserRouter>
      <div className="header shadow-sm w-100 py-3 position-fixed">
        <Heder selectMode={mode} />
      </div>
      <div className="App">
        <Switch>
          <Route path="/" component={AllBlogs} exact />
          <Route path="/name/:name" component={SingleBlog} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
