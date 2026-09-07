import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FormEvent, useState } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    setFormStatus("submitting");
    if (!endpoint) {
      window.location.href = `mailto:shashwatop89@gmail.com?subject=${subject}&body=${body}`;
      setFormStatus("success");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      event.currentTarget.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} required />
          </label>
          <button type="submit" disabled={formStatus === "submitting"}>
            {formStatus === "submitting" ? "Sending..." : "Send message"}
          </button>
          {formStatus === "success" && (
            <p className="contact-form-status">Message sent successfully.</p>
          )}
          {formStatus === "error" && (
            <p className="contact-form-status contact-form-error">
              Could not send the message. Please email me directly.
            </p>
          )}
        </form>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:shashwatop89@gmail.com" data-cursor="disable">
                shashwatop89@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+919691542567" data-cursor="disable">
                +91 9691542567
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/ShashwatEv"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/shashwat-singh-ji"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="mailto:shashwatop89@gmail.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Shashwat Singh Chandel</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
