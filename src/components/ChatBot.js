import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // Function to load Kommunicate script
    const loadKommunicateScript = () => {
      // Kommunicate settings
      const kommunicateSettings = {
        appId: "3f0188b2f711065df492000b8a9443d1c",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };

      // Create script element
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://widget.kommunicate.io/v2/kommunicate.app";

      // Handle script load success
      script.onload = () => {
        try {
          // Ensure kommunicate is defined and set globals
          window.kommunicate = window.kommunicate || {};
          window.kommunicate._globals = kommunicateSettings;
        } catch (error) {
          console.error("Error setting Kommunicate globals:", error);
        }
      };

      // Handle script load error
      script.onerror = (error) => {
        console.error("Error loading Kommunicate script:", error);
      };

      // Append script to head
      document.head.appendChild(script);
    };

    // Load Kommunicate script on component mount
    loadKommunicateScript();
  }, []);

  return (
    <div>
      <h1>This is the chat bot</h1>
    </div>
  );
};

export default ChatBot;
