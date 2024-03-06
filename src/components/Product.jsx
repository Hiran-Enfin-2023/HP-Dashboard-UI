import React, { useEffect, useState } from 'react';
import "../App.css"
import ProductSidebar from './ProductSiderBar';
import { ChatContainer, MainContainer, Message, MessageList } from '@chatscope/chat-ui-kit-react';

const Product = ({ selectedProductSession, setSelectedProductSession }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (selectedProductSession !== null) {

      loadTranscripts();
    }
  }, [selectedProductSession]);



  const loadTranscripts = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rest/product/${selectedProductSession}`, {
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
      <ProductSidebar setSelectedProductSession={setSelectedProductSession} selectedProductSession={selectedProductSession} />
      <div id='message-main'>

        <h3 style={{ position: "sticky" }} className="dash-head">Messages</h3>

        <div className="message-container">



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

export default Product;
