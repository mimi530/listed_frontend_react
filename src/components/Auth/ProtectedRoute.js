import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './AuthContext'

function ProtectedRoute({component: Component, ...rest}) {

    const authContext = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            render={props => {
                if(authContext.isAuth) {
                    return <Component {...props}></Component>
                } else {
                    return <Redirect to="/"/>
                }
            }}
        />
    )
}

export default ProtectedRoute
