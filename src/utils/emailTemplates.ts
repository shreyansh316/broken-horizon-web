import type { PlaytestApplication } from '../types/playtest';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export function generateConfirmationEmail(app: PlaytestApplication): EmailPayload {
  const subject = 'BROKEN HORIZON — PLAYTEST APPLICATION RECEIVED';
  const cleanCallsign = app.callsign.toUpperCase();

  const text = `
BROKEN HORIZON — PRE-ALPHA CLEARANCE
--------------------------------------------------
OPERATIVE: ${cleanCallsign}
STATUS: APPLICATION RECEIVED

Your request for access to the Broken Horizon closed Windows PC playtest has been received.

OPERATIVE CALLSIGN: ${cleanCallsign}
EMAIL: ${app.email}
STATUS: APPLICATION RECEIVED (PENDING REVIEW)
TIMESTAMP: ${new Date(app.created_at).toUTCString()}

Your application is currently under review by the development team. If your clearance is approved for upcoming playtest waves, you will receive a secondary clearance dispatch containing your private access credentials and portal link.

No further action is required at this time.

--------------------------------------------------
BROKEN HORIZON
The road remembers.
https://broken-horizon.web.app
This is an automated message regarding your Broken Horizon playtest application.
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f1115; border: 1px solid #27272a; border-radius: 4px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td height="4" style="background-color: #ea580c;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px; border-bottom: 1px solid #1f2228;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.25em; color: #ea580c; text-transform: uppercase; margin-bottom: 8px;">PRE-ALPHA CLEARANCE SYSTEM</div>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 28px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase;">BROKEN HORIZON</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <div style="font-size: 13px; font-family: 'Courier New', Courier, monospace; color: #a1a1aa; margin-bottom: 24px;">
                OPERATIVE ID // <span style="color: #ea580c; font-weight: bold;">${cleanCallsign}</span>
              </div>

              <p style="font-size: 16px; color: #f4f4f5; margin: 0 0 20px 0;">
                Operative <strong>${cleanCallsign}</strong>,
              </p>

              <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 28px 0; line-height: 1.7;">
                Your request for access to the <strong>Broken Horizon</strong> closed Windows PC playtest has entered the pre-alpha clearance queue.
              </p>

              <!-- Telemetry Status Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #14171d; border: 1px solid #27272a; border-radius: 2px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">CALLSIGN</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: bold; color: #ffffff; padding-bottom: 6px;">${cleanCallsign}</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">PLATFORM TARGET</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #d4d4d8; padding-bottom: 6px;">Windows PC (DirectX 11/12)</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">QUEUED WAVE</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #ea580c; padding-bottom: 6px;">Wave 0${app.playtest_wave}</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a;">STATUS</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: bold; color: #f59e0b; text-transform: uppercase;">● UNDER REVIEW</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #71717a; margin: 0 0 24px 0; line-height: 1.6;">
                Your application is currently under review. When your wave opens, you will receive a secondary clearance email containing private download authorization and cryptographic build access. No further action is required.
              </p>

              <div style="border-left: 2px solid #ea580c; padding-left: 16px; margin: 28px 0;">
                <p style="margin: 0; font-size: 13px; font-style: italic; color: #d4d4d8;">
                  "They paved six hundred kilometers of desert to bury what happened underneath."
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0b0e; padding: 24px 40px; border-top: 1px solid #1f2228;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #52525b; letter-spacing: 0.1em;">
                      BROKEN HORIZON // CLOSED WINDOWS PC PLAYTEST
                    </div>
                    <div style="font-size: 11px; color: #3f3f46; margin-top: 4px;">
                      This is an automated transmission regarding your playtest clearance request.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { to: app.email, subject, html, text };
}

export function generateApprovalEmail(app: PlaytestApplication, portalBaseUrl: string): EmailPayload {
  const subject = 'BROKEN HORIZON — PLAYTEST CLEARANCE GRANTED';
  const cleanCallsign = app.callsign.toUpperCase();
  const token = app.access_token || 'TOKEN-VERIFIED';
  const portalUrl = `${portalBaseUrl.replace(/\/$/, '')}/playtest?token=${token}`;

  const text = `
BROKEN HORIZON — PRE-ALPHA CLEARANCE GRANTED
--------------------------------------------------
OPERATIVE: ${cleanCallsign}
STATUS: CLEARED FOR DEPLOYMENT
BUILD: Milestone 1 (Windows PC Pre-Alpha)

Your application for the Broken Horizon closed Windows PC playtest has been approved.

ACCESS LINK:
${portalUrl}

ACCESS TOKEN: ${token}
PLATFORM: Windows PC (x64)
ENGINE: Unreal Engine 4.27 Custom Pipeline

INSTRUCTIONS:
1. Open the Playtest Portal using your secure access link above.
2. Authenticate your build authorization and review the Milestone 1 briefing notes.
3. Download the authorized pre-alpha client.

IMPORTANT NOTICE:
Please keep your access link and build confidential. This pre-alpha build is under active development and intended exclusively for verified clearance operatives.

Welcome to the road.

--------------------------------------------------
BROKEN HORIZON
The road remembers.
https://broken-horizon.web.app
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f1115; border: 1px solid #ea580c; border-radius: 4px; overflow: hidden; box-shadow: 0 20px 40px rgba(234, 88, 12, 0.15);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td height="4" style="background-color: #22c55e;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px; border-bottom: 1px solid #1f2228;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.25em; color: #22c55e; text-transform: uppercase; margin-bottom: 8px;">PRE-ALPHA CLEARANCE // GRANTED</div>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 28px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase;">BROKEN HORIZON</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <div style="font-size: 13px; font-family: 'Courier New', Courier, monospace; color: #a1a1aa; margin-bottom: 24px;">
                OPERATIVE // <span style="color: #22c55e; font-weight: bold;">${cleanCallsign}</span>
              </div>

              <p style="font-size: 16px; color: #f4f4f5; margin: 0 0 20px 0;">
                Operative <strong>${cleanCallsign}</strong>,
              </p>

              <p style="font-size: 14px; color: #d4d4d8; margin: 0 0 28px 0; line-height: 1.7;">
                Your application for the <strong>Broken Horizon</strong> closed Windows PC playtest has been officially approved. You are authorized to access the Milestone 1 pre-alpha build.
              </p>

              <!-- Clearance Badge Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #14171d; border: 1px solid #27272a; border-radius: 2px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">STATUS</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: bold; color: #22c55e;">● CLEARED &amp; AUTHORIZED</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">TARGET PLATFORM</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #ffffff; padding-bottom: 6px;">Windows PC</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a; padding-bottom: 6px;">BUILD WAVE</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #ea580c; padding-bottom: 6px;">Milestone 1 (Pre-Alpha)</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #71717a;">AUTH TOKEN</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #a1a1aa;">${token.substring(0, 16)}...</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; padding: 16px 36px; border-radius: 2px; box-shadow: 0 8px 24px rgba(234, 88, 12, 0.4);">
                      ENTER PLAYTEST PORTAL &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 12px; color: #71717a; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                If the button above does not open, copy and paste this link into your browser:<br>
                <a href="${portalUrl}" style="color: #ea580c; word-break: break-all; font-size: 11px;">${portalUrl}</a>
              </p>

              <div style="background-color: #0c0d10; border-left: 2px solid #71717a; padding: 14px 16px; margin: 28px 0;">
                <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.6;">
                  <strong>CONFIDENTIALITY NOTICE:</strong> This build is pre-alpha software provided under confidentiality for feedback and telemetry. Do not redistribute binary archives.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0b0e; padding: 24px 40px; border-top: 1px solid #1f2228;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #52525b; letter-spacing: 0.1em;">
                      BROKEN HORIZON // THE ROAD REMEMBERS
                    </div>
                    <div style="font-size: 11px; color: #3f3f46; margin-top: 4px;">
                      Official pre-alpha transmission. Powered by Unreal Engine.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { to: app.email, subject, html, text };
}

export function generateWaitlistEmail(app: PlaytestApplication): EmailPayload {
  const subject = 'BROKEN HORIZON — PLAYTEST STATUS UPDATE';
  const cleanCallsign = app.callsign.toUpperCase();

  const text = `
BROKEN HORIZON — PLAYTEST STATUS UPDATE
--------------------------------------------------
OPERATIVE: ${cleanCallsign}
STATUS: CLEARANCE WAITLISTED

Your playtest application for Broken Horizon has been queued on the active clearance waitlist. As additional telemetry slots open in upcoming deployment waves, waitlisted operatives will be granted access sequentially.

No further action is required at this time.

--------------------------------------------------
BROKEN HORIZON
The road remembers.
https://broken-horizon.web.app
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #08090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f1115; border: 1px solid #3f3f46; border-radius: 4px; overflow: hidden;">
          <tr>
            <td height="4" style="background-color: #f59e0b;"></td>
          </tr>
          <tr>
            <td style="padding: 36px 40px 20px 40px; border-bottom: 1px solid #1f2228;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.25em; color: #f59e0b; text-transform: uppercase; margin-bottom: 8px;">STATUS DISPATCH</div>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: 700; color: #ffffff; text-transform: uppercase;">BROKEN HORIZON</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <p style="font-size: 15px; color: #f4f4f5; margin: 0 0 16px 0;">Operative <strong>${cleanCallsign}</strong>,</p>
              <p style="font-size: 14px; color: #a1a1aa; line-height: 1.7; margin: 0 0 24px 0;">
                Your playtest application for <strong>Broken Horizon</strong> has been placed on the active clearance waitlist. As server bandwidth and test capacities expand in upcoming waves, waitlisted operatives are released in priority order.
              </p>
              <p style="font-size: 13px; color: #71717a; margin: 0;">No further action is needed. You will receive an immediate clearance dispatch once an active slot is allocated.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0a0b0e; padding: 20px 40px; border-top: 1px solid #1f2228;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #52525b;">BROKEN HORIZON // THE ROAD REMEMBERS</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { to: app.email, subject, html, text };
}
