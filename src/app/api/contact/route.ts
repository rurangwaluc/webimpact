import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  budget?: string;
  timeline?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const service = clean(body.service);
    const message = clean(body.message);
    const budget = clean(body.budget) || "Not sure yet";
    const timeline = clean(body.timeline);

    if (!name || !email || !phone || !service || !message || !timeline) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Please describe the problem with a little more detail." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "WebImpact Lab <onboarding@resend.dev>";

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { message: "Contact form is not configured yet." },
        { status: 500 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeBudget = escapeHtml(budget);
    const safeTimeline = escapeHtml(timeline);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New WebImpact Lab lead: ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New project request</h2>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone / WhatsApp:</strong> ${safePhone}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
          <p><strong>Timeline:</strong> ${safeTimeline}</p>

          <hr />

          <h3>Problem / request</h3>
          <p>${safeMessage}</p>
        </div>
      `,
      text: `
New WebImpact Lab project request

Name: ${name}
Email: ${email}
Phone / WhatsApp: ${phone}
Service: ${service}
Budget: ${budget}
Timeline: ${timeline}

Problem / request:
${message}
      `,
    });

    if (error) {
      console.error("RESEND_CONTACT_ERROR", error);

      return NextResponse.json(
        {
          message:
            "The request was received, but the email could not be sent. Check Resend configuration.",
          resendError: error.message,
        },
        { status: 500 },
      );
    }

    console.log("RESEND_CONTACT_SENT", data);

    return NextResponse.json({
      message: "Request sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("CONTACT_ROUTE_ERROR", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}