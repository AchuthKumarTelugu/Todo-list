import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
export default function Card({ task, deleteTask, toggleStatus,inputRef }) {
    let [status, setStatus] = useState(false)
    let cardRef = useRef()
    const handleDeleteIcon = () => {
        deleteTask(task.id)
        // cardRef.current.remove()
    }
    const handleCompleteIcon = () => {
        setStatus(true)
        toggleStatus(task.id)
        // console.log('task after toggle status',task)
    }
    const handleEditIcon = ()=>{
           inputRef.current.value=task.taskName
           deleteTask(task.id)
        // cardRef.current.remove()
    }
    useEffect(()=>{
        console.log('inputRef',inputRef.current)
    },[])
    return (
        <div>
            <div className="card" >

                <div className="card-body" ref={cardRef}>

                    <h5 className="card-title">
                        {status ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} className='title-icon' /> : <FontAwesomeIcon icon={faSquare} className='title-icon' style={{ color: 'red' }} onClick={handleCompleteIcon} />}
                        {
                            task ?(status ? <del>{task.taskName}</del> : <div>{task.taskName}</div>):<div></div>
                        }
                    </h5>
                    <div className="card-icons">
                        <div className="icon icon1"><FontAwesomeIcon icon={faPenToSquare} onClick={handleEditIcon}/> </div>
                        <div className='icon icon2'><FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteIcon} /></div>

                    </div>
                </div>
            </div>
        </div>
    )
}
