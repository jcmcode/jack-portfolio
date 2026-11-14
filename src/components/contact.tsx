"use client";

import { useState, type FormEvent } from "react";
import T from "./typed";
import Turnstile from "./turnstile";
import { EMAIL_RE, postJson } from "@/lib/api";
import { RESUME_URL, SOCIAL_LINKS, TURNSTILE_SITE_KEY } from "@/lib/site";

type Status = "idle" | "sending" | "sent";

function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "", hp_extra: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [sentName, setSentName] = useState("");

  const update = (key: keyof typeof fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const { name, email, subject, message } = fields;
    if (!name.trim() || !EMAIL_RE.test(email.trim()) || !subject.trim() || !message.trim()) {
      setError("Add your name, a valid email, a subject and a short message.");
      return;
    }
    if (!token) {
      setError(TURNSTILE_SITE_KEY ? "Still checking you're not a bot. Try again in a second." : "This form isn't set up yet.");
      return;
    }
    setError("");
    setStatus("sending");
    const result = await postJson("/api/contact", { ...fields, turnstileToken: token });
    if (result.ok) {
      setSentName(name.trim().split(" ")[0]);
      setStatus("sent");
      setFields({ name: "", email: "", subject: "", message: "", hp_extra: "" });
    } else {
      setError(result.error);
      setStatus("idle");
    }
    setToken(null);
    setWidgetKey((k) => k + 1);
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <strong>Thanks, {sentName || "there"}. Message sent.</strong>
        <p>It&apos;s in my inbox now. I&apos;ll reply to the address you gave.</p>
        <button type="button" className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => setStatus("idle")}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label className="field">
          <T>Name</T>
          <input type="text" name="name" autoComplete="name" value={fields.name} onChange={update("name")} maxLength={100} required />
        </label>
        <label className="field">
          <T>Email</T>
          <input type="email" name="email" autoComplete="email" value={fields.email} onChange={update("email")} maxLength={254} required />
        </label>
      </div>
      <label className="field">
        <T>Subject</T>
        <input type="text" name="subject" placeholder="What's it about?" value={fields.subject} onChange={update("subject")} maxLength={150} required />
      </label>
      <label className="field">
        <T>Message</T>
        <textarea name="message" rows={5} placeholder="A few lines is plenty." value={fields.message} onChange={update("message")} maxLength={5000} required />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this empty
        <input type="text" name="hp_extra" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={fields.hp_extra} onChange={update("hp_extra")} />
      </label>
      <Turnstile onToken={setToken} resetKey={widgetKey} />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-foot">
        <span className="fine-print">
          <T>Protected by Cloudflare Turnstile. Your email is only used to reply.</T>
        </span>
        <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
          <T>{status === "sending" ? "Sending…" : "Send message"}</T>
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <div className="contact-aside">
          <h2 className="contact-title">
            <T>Get in touch</T>
          </h2>
          <p className="contact-lead" data-build="box">
            <T>Send me a message here and I&apos;ll get back to you by email.</T>
          </p>
          <div className="link-list" data-build="box">
            {SOCIAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                <T>{l.label}</T>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noopener">
              <T>Resume (PDF)</T>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="panel contact-form reveal" data-build="box">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
