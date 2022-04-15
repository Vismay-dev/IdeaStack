import {createContext} from 'react'

const userContext = createContext({
    user: {
        firstName : '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    age: 0,
    city: '',
    school: '',
    id:''
    },
    setUser:   () => {

    }
  
});

export default userContext