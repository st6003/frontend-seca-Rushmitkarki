import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"3f0188b2f711065df492000b8a9443d1c","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []); // Empty dependency array means this runs once when the component mounts.

  return (
    <div>
      <h1>This is the chat bot</h1>
    </div>
  );
}

export default ChatBot;
