import NavBar from "./NavMenu/NavBar"

import Landing from "./Landing/Landing"

import {Switch, Route, Redirect} from 'react-router-dom'
import Profile from "./Profile/Profile"

const MainContent = () => {


    return (
        <>
            <Switch>
            <Route path = '/home'>
                {!(sessionStorage.getItem('token'))  ? 
                    <Landing/>:
                    <Redirect to = '/'/>
                }
            </Route>
            <Route path = '/profile'  render = {()=> sessionStorage.getItem('token')? <Profile/>:<Redirect to = '/'/>}  />
            <Route path = '/'>
            {!(sessionStorage.getItem('token'))  ? 
                     <Redirect to = '/home'/> :
                    <Redirect to = '/profile'/>
            }
            </Route>
            </Switch>
            {/* <Landing/> */}
            
        
        
        </>
    )


}

export default MainContent