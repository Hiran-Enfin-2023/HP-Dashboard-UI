import React, { useEffect, useState } from 'react';
import "../App.css"
import Sidebar from './Sidebar';
import { ChatContainer, MainContainer, Message, MessageList } from '@chatscope/chat-ui-kit-react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Concierge = ({ selectedSession, setSelectedSession, menu, setMenu }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (selectedSession !== null) {

      loadTranscripts();
    }
  }, [selectedSession]);



  const loadTranscripts = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rest/concierge/${selectedSession}`, {
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


 



  return (
    <section className="middle-sections" id="transcripts">
      <Sidebar setSelectedSession={setSelectedSession} selectedSession={selectedSession} />

      <div id='message-main'>

        <h3 style={{ position: "sticky" }} className="dash-head">Messages</h3>

        <div className="message-container">

          {/* {messages.map((message, index) => {
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
          } */}
          <MainContainer>
            <ChatContainer>

              <MessageList >
                {messages.map((message) => {
                  return (
                    <>
                      <Message style={{ padding: '8px' }}
                        model={{
                          message: message.content,
                          direction: message.role === 'assistant' ? 'outgoing' : 'incoming'
                        }}
                      />
                
                    </>
                  )
                })}
              </MessageList>

          
            </ChatContainer>
          </MainContainer>
        </div>

      </div>
    </section>
  );
};

export default Concierge;
