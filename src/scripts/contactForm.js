document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form")
  const status = document.getElementById("form-status")

  const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzcGyT4WLeD5g1dSA7-sg1EwCCl4mIWLjGU52_s4sHcki8zzW90AieDVSFvmDHDfElERw/exec"

  if (!form) return

  const showStatus = (message, isError = true) => {
    status.textContent = message
    status.classList.remove("text-red-600", "text-green-600")
    status.classList.add(isError ? "text-red-600" : "text-green-600")
    status.style.opacity = "1"
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const name = formData.get("name")?.trim()
    const email = formData.get("email")?.trim()
    const phone = formData.get("phone")?.trim()
    const message = formData.get("message")?.trim()

    if (!name || !message) {
      showStatus("Please fill in your name and message.")
      return
    }

    if (!email && !phone) {
      showStatus("Please provide either an email or phone number.")
      return
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      showStatus("Please enter a valid email address.")
      return
    }

    const rawPhone = phone.replace(/\D/g, "")
    if (phone && rawPhone.length !== 10) {
      showStatus("Phone number must be exactly 10 digits.")
      return
    }

    showStatus("Sending…", false)

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: new URLSearchParams(formData),
      })

      if (!response.ok) throw new Error("Network error")

      showStatus("Thank you! Your message has been sent.", false)
      form.reset()
    } catch (err) {
      showStatus("Something went wrong. Please try again.")
      console.error(err)
    }
  })
})
