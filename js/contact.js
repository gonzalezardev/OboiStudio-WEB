// Inicialización con Public Key de EmailJS
emailjs.init("Fef1NO8DOfZa-_rXB");

const btn = document.getElementById("button");
const formMsg = document.getElementById("form-message");

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  btn.value = "Enviando...";

  emailjs.sendForm(
    "service_y7o3nmd",   // ⚠️ tu Service ID
    "template_2c6mb2q",  // ⚠️ tu Template ID
    this
  ).then(() => {
    btn.value = "Enviar";
    formMsg.textContent = "✅ Mensaje enviado con éxito!";
    formMsg.className = "form-message success";
    this.reset();
  }, (err) => {
    btn.value = "Enviar";
    formMsg.textContent = "❌ Error al enviar: " + JSON.stringify(err);
    formMsg.className = "form-message error";
    console.error("EmailJS error:", err);
  });
});
