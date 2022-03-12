import NavBar from "./NavMenu/NavBar"
import Landing from "./Landing/Landing"
import Browse from "./Browse/Browse"
import Profile from "./Profile/Profile"
import MyProjects from './MyProjects/MyProjects'

import {Switch, Route, Redirect} from 'react-router-dom'


const MainContent = () => {


    return (
        <>
        <div class = 'relative top-[90px]'>
            <Switch>
            <Route path = '/home'>
                {!(sessionStorage.getItem('token'))  ? 
                    <Landing/>:
                    <Redirect to = '/'/>
                }
            </Route>
            <Route path = '/profile'  render = {()=> sessionStorage.getItem('token')? <Profile/>:<Redirect to = '/'/>}  />
            <Route path = '/browse'  render = {()=> sessionStorage.getItem('token')? <Browse/>:<Redirect to = '/'/>}  />
            <Route path = '/myprojects'  render = {()=> sessionStorage.getItem('token')? <MyProjects/>:<Redirect to = '/'/>}  />

            <Route path = '/'>
            {!(sessionStorage.getItem('token'))  ? 
                     <Redirect to = '/home'/> :
                    <Redirect to = '/profile'/>
            }
            </Route>
            </Switch>
            {/* <Landing/> */}
            
        
            </div>
        </>
    )


}

export default MainContent