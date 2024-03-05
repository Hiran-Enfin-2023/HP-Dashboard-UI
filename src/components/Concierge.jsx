import React, { useEffect, useState } from 'react';
import "../App.css"
import Sidebar from './Sidebar';

const Concierge = ({ selectedSession, setSelectedSession, menu, setMenu }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (selectedSession !== null) {

      loadTranscripts();
    }
  }, [selectedSession]);

  // console.log(selectedSession);

  const loadTranscripts = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const response = await fetch(`http://localhost:5000/rest/concierge/${selectedSession}`, {
        headers: {
          Authorization: token
        },

      });
      const data = await response.json();
      const arrayData = JSON.parse(data[0].messages)

      setMessages(arrayData);
    } catch (error) {
      console.error('Error loading transcripts:', error);
    }
  };
  console.log(messages);

  return (
    <section className="middle-sections" id="transcripts">
      <Sidebar setSelectedSession={setSelectedSession} />

      <div id='message-main'>

        <h3 style={{position:"sticky"}} className="dash-head">Messages</h3>

        <div className="message-container">

          {messages.map((message, index) => {
            return (
              <div className="box">
                <div
                  key={index}
                  className={`message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
                >
                  <div className={`messages ${message.role === 'assistant' ? 'assistant-msg' : 'user-msg'}`}>
                    {message.content}
                  </div>
                  <div className="role">
                    <h6>{message.role}</h6>
                  </div>
                </div>

              </div>
            )
          }
          )
          }
        </div>

      </div>
    </section>
  );
};

export default Concierge;
