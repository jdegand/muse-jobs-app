import { format, parseISO } from 'date-fns';
import { Markup } from 'interweave';
import { useState } from 'react';

const Job = ({job, location}) => {

    const [show, setShow] = useState(false)

    const handleToggle = () => {
        setShow(prev => !prev)
    }

    return (
        <div className="flex-column">
        <h1>{job.company.name}</h1>
        <h2>{job.name}</h2>
        <div className="flex">
          <h3>{job.levels[0]?.name}</h3>
          <h4 className="flex">
            <span>
                <svg style={{width:"24px", height:"24px", backgroundColor:"#fff"}} viewBox="0 0 24 24">
                    <path fill="gray" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
            </span>
            <span>
                {location.replace(/%20/g, ' ')}
            </span>
          </h4>
          <h4 className="flex"> 
            <span>
            <svg style={{width:"24px", height:"24px", backgroundColor:"#fff"}} viewBox="0 0 24 24">
                <path fill="gray" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
            </svg>
            </span>
            <span>
                {format(parseISO(job.publication_date), 'MM-dd-yy')}
            </span>
          </h4>
        </div>
        <button onClick={()=>handleToggle()}>{!show ? 'View Details' : 'Close Details'}</button>
        {show && <Markup content={job.contents} />}
      </div>
    )
}

export default Job