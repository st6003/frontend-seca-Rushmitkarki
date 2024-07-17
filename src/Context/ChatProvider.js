// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//     const [user, setUser] = useState();
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (!storedUser) {
//             navigate("/login"); 
//         }
//         setUser(storedUser);
//     }, [navigate]); 

//     return (
//         <ChatContext.Provider value={{ user, setUser }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };

// export const ChatState = () => {
//     return useContext(ChatContext);
// };

// export default ChatProvider;
