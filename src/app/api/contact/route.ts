import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.WEBHOOK_URL;
    const recipientEmail = "khanaarizkhan008@gmail.com";
    const timestamp = new Date().toISOString();

    if (webhookUrl) {
      try {
        let response;
        // Check if Discord webhook
        if (webhookUrl.includes("discord.com/api/webhooks")) {
          response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: "Portfolio Contact Bot",
              embeds: [
                {
                  title: "📬 New Portfolio Inquiry",
                  color: 0x10b981, // Emerald green
                  fields: [
                    { name: "Sender Name", value: name, inline: true },
                    { name: "Sender Email", value: email, inline: true },
                    { name: "Recipient", value: recipientEmail, inline: false },
                    { name: "Message", value: message, inline: false },
                  ],
                  footer: { text: `Submitted at ${new Date().toLocaleString()}` },
                },
              ],
            }),
          });
        } else if (webhookUrl.includes("hooks.slack.com")) {
          // Slack webhook format
          response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: `*New Contact Message from ${name} (${email})*\n>${message}`,
            }),
          });
        } else {
          // Standard JSON payload for Zapier, Make, Formspree, n8n, custom server, etc.
          response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              message,
              recipient: recipientEmail,
              submittedAt: timestamp,
            }),
          });
        }
        console.log(`[Contact Webhook] Status: ${response.status} ${response.statusText}`);
      } catch (webhookError) {
        console.error("[Contact Webhook] Request failed:", webhookError);
      }
    } else {
      console.log(`[Contact Webhook] No CONTACT_WEBHOOK_URL configured. Message from ${name} (${email}): ${message}`);
    }

    // Save to the database for the admin dashboard inbox
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
        },
      });
      console.log(`[Contact Message] Saved to database from ${email}`);
    } catch (dbError) {
      console.error("[Contact Message] Database save failed:", dbError);
    }

    return NextResponse.json(
      { success: true, message: "Message dispatched successfully! I will get back to you shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact webhook error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try sending a direct email." },
      { status: 500 }
    );
  }
}
