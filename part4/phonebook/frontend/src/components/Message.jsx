

const Message = ({ content, status }) => {



  if (content) {
    return <h1 className={`message-wrapper ${status}`}>{content}</h1>;
  } else {
    return null;
  }
};

export default Message;
