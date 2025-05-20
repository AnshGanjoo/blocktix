const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;
const DATA_FILE = "blocktix.json";

app.use(bodyParser.json());
app.use(express.static("public"));

// -------- Blockchain Classes --------
class Block {
  constructor(index, timestamp, data, prevHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const input = this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash;
    return require("crypto").createHash("sha256").update(input).digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), { ticket: "GENESIS" }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const prev = this.getLatestBlock();
    const newBlock = new Block(this.chain.length, new Date().toISOString(), data, prev.hash);
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];
      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.prevHash !== prev.hash) return false;
    }
    return true;
  }
}

// Load from file or create new
let ticketChain;
if (fs.existsSync(DATA_FILE)) {
  const saved = JSON.parse(fs.readFileSync(DATA_FILE));
  ticketChain = new Blockchain();
  ticketChain.chain = saved.map(b => {
    const blk = new Block(b.index, b.timestamp, b.data, b.prevHash);
    blk.hash = b.hash;
    return blk;
  });
} else {
  ticketChain = new Blockchain();
}

// API Routes
app.get("/api/tickets", (req, res) => res.json(ticketChain.chain));

app.post("/api/tickets", (req, res) => {
  ticketChain.addBlock(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(ticketChain.chain, null, 2));
  res.json({ message: "Ticket added." });
});

app.get("/api/validate", (req, res) => {
  res.json({ valid: ticketChain.isValid() });
});

app.listen(PORT, () => {
  console.log(`BlockTix server running at http://localhost:${PORT}`);
});