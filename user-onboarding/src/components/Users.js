import React from 'react'

function User(props) {
    const { info } = props
    return (
        <div> 
            <li> Name: {info.name} Email: {info.email} Password: {info.password} </li>
        </div>
)
}

export default User