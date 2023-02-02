import React from 'react'
import { useParams } from 'react-router-dom'

interface Param {
    id: string;
}

const CoachDetail = () => {
    const asd: any = useParams();
    const params: Param = asd
    return (
        <>
            {params.id}
        </>
    )
}

export default CoachDetail