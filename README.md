# BlockTix – Blockchain-Based Ticket Tracker
BlockTix is a simple yet powerful ticket tracking system that uses blockchain principles to record event ticket issuance in an immutable and verifiable format. Built using Node.js and vanilla JavaScript, it allows users to issue event tickets, view a blockchain of ticket history, and validate its integrity.

---

## Features
- 🔐 Each ticket is recorded as a block in a blockchain
- 🧾 Ticket entries include event name, ticket holder, and seat number
- 🔗 SHA256 hashing ensures tamper-proof block validation
- ✅ Blockchain can be validated for integrity in one click
- 💾 Data is stored in a local JSON file (`blocktix.json`) for persistence

---

## Tech Stack
| Layer       | Technology                |
|-------------|---------------------------|
| Frontend    | HTML, CSS, JavaScript     |
| Backend     | Node.js, Express.js       |
| Blockchain  | Custom logic (JavaScript) |
| Storage     | JSON file                 |

---

## 🧱 Project Structure
blocktix/ ├── server.js # Backend server & blockchain logic ├── blocktix.json # Ticket blockchain (persistent storage) ├── package.json # Project metadata and dependencies └── public/ ├── index.html # Ticket form UI ├── script.js # Client-side logic └── style.css # Styling

---
## ▶️ How to Run
Install dependencies:bash
npm install
Start the server:bash
node server.js
Open your browser:arduino
http://localhost:3000

SAMPLE block output
![alt text](<CHAIN VALIDATION BLOCKTIX.png>)
{
  "index": 2,
  "timestamp": "2025-04-21T14:20:00",
  "data": {
    "event": "Music Fest 2025",
    "holder": "Ansh",
    "seat": "B12"
  },
  "previousHash": "a0f22c...",
  "hash": "bb1ee7..."
}

Learning Outcomes
    Implemented a functional blockchain system without external libraries
    Practiced frontend-backend integration using fetch and Express APIs
    Learned how blockchain ensures data immutability and traceability
    Gained experience working with JSON file persistence

Future Scope
    Add QR-code generation for ticket verification
    User authentication and role-based access (organizer vs. attendee)
    Chart-based ticket analytics
    Deployment on a cloud platform (e.g., Render, Railway)

Author
Ansh Ganjoo
Project: BlockTix – Blockchain Ticket Tracker
Developed as part of academic blockchain coursework