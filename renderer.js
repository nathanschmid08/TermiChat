const { ipcRenderer } = require('electron');

// Define SVG icons
const userSvg = `<svg viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`;
const robotSvg = `<svg viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>`;

// Format the current time
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");
  const sendButton = document.getElementById("sendButton");
  
  // Welcome message on startup (after a short delay)
  setTimeout(() => {
    const welcomeContainer = document.createElement("div");
    welcomeContainer.className = "message-container response-container";
    
    const welcomeAvatar = document.createElement("div");
    welcomeAvatar.className = "avatar response-avatar";
    welcomeAvatar.innerHTML = robotSvg;
    
    const welcomeMessage = document.createElement("div");
    welcomeMessage.className = "message response-message";
    
    const welcomeContent = document.createElement("div");
    welcomeContent.textContent = "Welcome to TermiChat! Use me like your terminal :)";
    
    const welcomeTime = document.createElement("div");
    welcomeTime.className = "message-time";
    welcomeTime.textContent = getCurrentTime();
    
    welcomeMessage.appendChild(welcomeContent);
    welcomeMessage.appendChild(welcomeTime);
    welcomeContainer.appendChild(welcomeAvatar);
    welcomeContainer.appendChild(welcomeMessage);
    output.appendChild(welcomeContainer);
  }, 500);
  
  // Function to handle sending messages
  async function sendMessage() {
    const command = input.value.trim();
    if (command) {
      // Create user message container and components
      const userContainer = document.createElement("div");
      userContainer.className = "message-container user-container";
      
      // User avatar
      const userAvatar = document.createElement("div");
      userAvatar.className = "avatar user-avatar";
      userAvatar.innerHTML = userSvg;
      
      // User message
      const userMessage = document.createElement("div");
      userMessage.className = "message user-message";
      
      // Message content
      const messageContent = document.createElement("div");
      messageContent.textContent = command;
      
      // Message timestamp
      const timeElement = document.createElement("div");
      timeElement.className = "message-time";
      timeElement.textContent = getCurrentTime();
      
      userMessage.appendChild(messageContent);
      userMessage.appendChild(timeElement);
      userContainer.appendChild(userAvatar);
      userContainer.appendChild(userMessage);
      output.appendChild(userContainer);
      
      // Clear input and scroll to latest message
      input.value = "";
      output.scrollTop = output.scrollHeight;
      
      // Show typing indicator
      const typingContainer = document.createElement("div");
      typingContainer.className = "message-container response-container";
      
      const responseAvatar = document.createElement("div");
      responseAvatar.className = "avatar response-avatar";
      responseAvatar.innerHTML = robotSvg;
      
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";
      typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      
      typingContainer.appendChild(responseAvatar);
      typingContainer.appendChild(typingIndicator);
      output.appendChild(typingContainer);
      
      // Get response with slight delay to show typing
      try {
        const result = await ipcRenderer.invoke("run-command", command);
        
        // Remove typing indicator
        output.removeChild(typingContainer);
        
        // Create response container and components
        const responseContainer = document.createElement("div");
        responseContainer.className = "message-container response-container";
        
        // Response avatar
        const responseAvatar = document.createElement("div");
        responseAvatar.className = "avatar response-avatar";
        responseAvatar.innerHTML = robotSvg;
        
        // Response message
        const responseMessage = document.createElement("div");
        responseMessage.className = "message response-message";
        
        // Message content
        const responseContent = document.createElement("div");
        responseContent.textContent = result;
        
        // Message timestamp
        const responseTime = document.createElement("div");
        responseTime.className = "message-time";
        responseTime.textContent = getCurrentTime();
        
        responseMessage.appendChild(responseContent);
        responseMessage.appendChild(responseTime);
        responseContainer.appendChild(responseAvatar);
        responseContainer.appendChild(responseMessage);
        output.appendChild(responseContainer);
        
      } catch (error) {
        // Remove typing indicator
        output.removeChild(typingContainer);
        
        // Create error response
        const errorContainer = document.createElement("div");
        errorContainer.className = "message-container response-container";
        
        const errorAvatar = document.createElement("div");
        errorAvatar.className = "avatar response-avatar";
        errorAvatar.innerHTML = robotSvg;
        
        const errorMessage = document.createElement("div");
        errorMessage.className = "message response-message";
        errorMessage.style.background = "linear-gradient(135deg, #d24545, #ff6b6b)";
        
        const errorContent = document.createElement("div");
        errorContent.textContent = "An error occurred. Please try again.";
        
        const errorTime = document.createElement("div");
        errorTime.className = "message-time";
        errorTime.textContent = getCurrentTime();
        
        errorMessage.appendChild(errorContent);
        errorMessage.appendChild(errorTime);
        errorContainer.appendChild(errorAvatar);
        errorContainer.appendChild(errorMessage);
        output.appendChild(errorContainer);
      }
      
      // Scroll to bottom after adding new content
      output.scrollTop = output.scrollHeight;
    }
  }
  
  // Handle keyboard events
  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
  
  // Handle send button click
  sendButton.addEventListener("click", sendMessage);
});