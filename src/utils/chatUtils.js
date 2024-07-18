export const isSameSenderMargin = (messages, message, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === message.sender._id &&
    messages[index].sender._id !== userId
  ) {
    return 33;
  } else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== message.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, message, index) => {
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
};

export const getSenderName = (loggedUser, users) => {
  if (!users || users.length < 2) return "";
  return users[0]?._id === loggedUser?._id ? users[1].firstName : users[0].firstName;
};
