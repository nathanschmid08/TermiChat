const { ipcRenderer } = require("electron");

// Define SVG icons
const userSvg = `<svg viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`;
const robotSvg = `<svg viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>`;
const paperPlaneSvg = `<svg viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>`;

// Format the current time
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("commandInput");
  const output = document.getElementById("output");
  const sendButton = document.getElementById("sendButton");

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
      userContainer.appendChild(userMessage);
      userContainer.appendChild(userAvatar);
      output.appendChild(userContainer);

      input.value = "";

      const result = await ipcRenderer.invoke("run-command", command);

      // Create response container and components
      const responseContainer = document.createElement("div");
      responseContainer.className = "message-container response-container";

      // avatar
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
      responseContainer.appendChild(responseMessage);
      responseContainer.appendChild(responseAvatar);
      output.appendChild(responseContainer);

      output.scrollTop = output.scrollHeight;
    }
  }

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  sendButton.addEventListener("click", sendMessage);
});
