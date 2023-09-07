import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AssignRole = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(id)
    }, [])


    return (
        <div>
            <h1>Assign Role</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default AssignRole