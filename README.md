# Word Cloud System (Tab & Desktop)

This project allows you to collect messages from a tablet and display them as a live-updating word cloud on a desktop.

## Setup

1. **Install Node.js** (if not already installed).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   ```

## Usage

### 1. Desktop Interface (The Word Cloud)
- Open a browser on your desktop and go to:
  `http://localhost:3000/desktop/`
- This page will display the word cloud. It updates automatically every 5 seconds.

### 2. Tablet Interface (The Input Form)
- Find your desktop's local IP address (e.g., `192.168.1.15`).
- On your Android tablet (connected to the same Wi-Fi), open the browser and go to:
  `http://192.168.1.15:3000/tab/`
- Enter your name, department, and a message.
- Click "Send Message".

## Data Storage
- All submissions are saved locally in the `data/messages.csv` file on the desktop.
- Format: `Name,Department,Message,Timestamp`

## Features
- **Live Updating:** The desktop word cloud refreshes automatically as new messages arrive.
- **Word Frequency:** More frequent words appear larger in the cloud.
- **CSV Logging:** Keeps a permanent record of all interactions.
- **Localhost Powered:** Runs entirely on your local network without external database requirements.
