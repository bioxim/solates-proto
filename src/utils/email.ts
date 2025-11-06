// utils/email.ts
import emailjs from "@emailjs/browser";

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_VERIFY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VERIFY;
const TEMPLATE_CONFIRMED = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONFIRMED;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const APP_NAME = "Solates";

emailjs.init(PUBLIC_KEY);

export async function sendVerificationEmail(to_email: string, verify_link: string) {
  const params = {
    to_email,
    verify_link,
    project_name: APP_NAME,
    subject: `${APP_NAME} — Confirm your email`
  };
  return emailjs.send(SERVICE, TEMPLATE_VERIFY, params);
}

export async function sendConfirmedEmail(to_email: string) {
  if (!TEMPLATE_CONFIRMED) return Promise.resolve();
  const params = { to_email, project_name: APP_NAME, subject: `${APP_NAME} — Subscription confirmed` };
  return emailjs.send(SERVICE, TEMPLATE_CONFIRMED, params);
}
