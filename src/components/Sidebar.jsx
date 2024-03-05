import React, { useEffect, useState } from 'react';
const Sidebar = ({ setSelectedSession }) => {


  const [sessionList, setSessionList] = useState([]);


  useEffect(() => {
    loadTranscripts();
  }, []);

 
  const loadTranscripts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rest/concierge/sessions`);
      const data = await response.json();
      setSessionList(data);
    } catch (error) {
      console.error('Error loading transcripts:', error);
    }
  };

console.log(sessionList);
  const formatDate = (event) => {
    const date = new Date(event);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Set to true for 12-hour time format with AM/PM

    };

    const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDateTime;
  }
  return (
    <div className="main">
      <div className="sidebar">

        <ul>
          <li>
            <div >
            Concierge
            </div>
          </li>
          <li>
            {
              sessionList?.map((e, index) => {
                return (
                  <div key={index} onClick={() => setSelectedSession(e.sessionId)} choro className='user-list'>
                    <img style={{ color: "white" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Emoji_u1f4ac.svg/128px-Emoji_u1f4ac.svg.png" alt="" srcset="" />
                    <h5 >{formatDate(e.timestamp)}</h5>
                  </div>
                )
              })
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
