/**
 * ==============================================================================
 * BROKEN HORIZON — PLAYTEST CLEARANCE GOOGLE APPS SCRIPT WEBHOOK
 * 100% Free Google Sheets Logging + Ishaan Mirza Styled HTML Email Dispatch
 * ==============================================================================
 * 
 * INSTRUCTIONS:
 * 1. Go to https://sheets.new and create a new Google Sheet named "Broken Horizon Playtesters"
 * 2. In Row 1, set these 4 headers:
 *    A1: Timestamp | B1: Callsign | C1: Email | D1: ClearanceID
 * 3. In the top menu, go to: Extensions -> Apps Script
 * 4. Paste this code completely into Code.gs (replacing any template code).
 * 5. Click "Deploy" (top right button) -> "New deployment"
 * 6. Click the Gear icon next to "Select type" -> choose "Web app"
 * 7. Set:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so the website can submit without auth)
 * 8. Click "Deploy", authorize access with your Google account.
 * 9. Copy the generated Web App URL: https://script.google.com/macros/s/.../exec
 * 10. Paste into your .env as VITE_GOOGLE_APPS_SCRIPT_URL or into the website Admin Dashboard!
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const callsign = (data.callsign || "OPERATIVE").trim().toUpperCase();
    const email = (data.email || "").trim();
    const clearanceId = "BH-" + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Save to your Google Sheet
    sheet.appendRow([timestamp, callsign, email, clearanceId]);

    // 2. Send Styled HTML Email to the User
    const subject = `[PRE-ALPHA CLEARANCE] Dispatch Confirmed — Operative ${callsign} (${clearanceId})`;
    const htmlBody = `
      <div style="background-color:#090b10; color:#f3f4f6; font-family:'Segoe UI', Arial, sans-serif; padding:32px; max-width:600px; margin:0 auto; border:1px solid #27272a; border-top:4px solid #ea580c;">
        <p style="color:#ea580c; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:bold; margin:0 0 8px 0;">
          PRE-ALPHA CLEARANCE // ENCRYPTED DISPATCH
        </p>
        <h1 style="color:#ffffff; font-size:24px; margin:0 0 16px 0; text-transform:uppercase; letter-spacing:0.5px;">
          ACCESS REQUEST LOGGED: ${callsign}
        </h1>
        <p style="color:#d1d5db; font-size:14px; line-height:1.6;">
          Your operative signal has been received by the <strong>Broken Horizon</strong> network. You are officially registered for upcoming closed Windows PC playtest waves and development dispatches.
        </p>
        
        <div style="background-color:#111827; border-left:3px solid #ea580c; padding:14px 18px; margin:22px 0; font-family:monospace; font-size:13px; color:#fdba74;">
          <div style="margin-bottom:4px;"><strong>OPERATIVE CALLSIGN:</strong> ${callsign}</div>
          <div style="margin-bottom:4px;"><strong>CLEARANCE ID:</strong> ${clearanceId}</div>
          <div style="margin-bottom:4px;"><strong>SECTOR:</strong> JAIPUR &rarr; UDAIPUR CORRIDOR</div>
          <div><strong>STATUS:</strong> PRE-ALPHA WAVE QUEUED</div>
        </div>

        <p style="color:#9ca3af; font-size:13px; line-height:1.6; border-left: 2px solid #374151; padding-left: 12px; margin: 20px 0;">
          <em>"Keep your radio on. When the next build drops on the Jaipur ring road, you'll get the coordinates here first."</em><br>
          <span style="color:#f97316; font-size:12px; font-weight:bold;">&mdash; Ishaan Mirza (Signal &amp; Comms)</span>
        </p>

        <div style="margin-top:26px; padding-top:18px; border-top:1px solid #1f2937;">
          <a href="https://broken-horizon.web.app/" style="background-color:#ea580c; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:3px; font-size:13px; font-weight:bold; display:inline-block; letter-spacing:1px;">
            OPEN OFFICIAL PORTAL &rarr;
          </a>
        </div>

        <p style="color:#52525b; font-size:11px; margin-top:24px; font-family:monospace;">
          Broken Horizon Studio &bull; https://broken-horizon.web.app/ &bull; Target: Windows PC (Unreal Engine 4.27)
        </p>
      </div>
    `;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      name: "Broken Horizon // Pre-Alpha Dispatch"
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", clearanceId: clearanceId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
