document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticketForm");
    const list = document.getElementById("ticketList");
    const result = document.getElementById("validationResult");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        event: event.value,
        holder: holder.value,
        seat: seat.value
      };
  
      await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      form.reset();
      loadTickets();
    });
  
    document.getElementById("validateBtn").addEventListener("click", async () => {
      const res = await fetch("/api/validate");
      const check = await res.json();
      result.innerText = check.valid ? "✅ Chain is valid" : "❌ Chain invalid!";
      result.style.color = check.valid ? "green" : "red";
    });
  
    async function loadTickets() {
      const res = await fetch("/api/tickets");
      const blocks = await res.json();
      list.innerHTML = "";
      blocks.forEach((block) => {
        const item = document.createElement("p");
        item.textContent = `#${block.index} - ${block.data.event} | ${block.data.holder} | Seat: ${block.data.seat}`;
        list.appendChild(item);
      });
    }
  
    loadTickets();
  });  