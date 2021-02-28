import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({isAuth, component: Component, ...rest}) {
    return (
        <Route 
            {...rest} 
            render={props => {
                if(isAuth) {
                    return <Component {...props}></Component>
                } else {
                    return <Redirect to="/"/>
                }
            }}
        />
    )
}

export default ProtectedRoute
