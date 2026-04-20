/**
 * Google Apps Script Backend for "Röntgen am Kai" Form
 * Features: Sheet logging, Email notification, CORS-friendly (text/plain)
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this code.
 * 4. Replace 'RECIPIENT_EMAIL' below with your destination address.
 * 5. Click "Deploy" -> "New Deployment".
 * 6. Select Type: "Web App".
 * 7. Execute as: "Me" (your account).
 * 8. Who has access: "Anyone".
 * 9. After deploying, copy the "Web App URL" and send it to me here.
 */

function doPost(e) {
  const SHEET_NAME = 'Terminanfragen';           
  const NOTIFICATION_EMAIL = 'ordination@roentgen-am-kai.at'; // CHANGEME if needed
  
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Set headers if it's a brand new sheet
      const headers = ['Zeitstempel', 'Name', 'Telefon', 'SVNr', 'Geburtsdatum', 'Untersuchung', 'Wunschdatum', 'Kommentare', 'Einsicht'];
      sheet.appendRow(headers);
    }

    // Parse data from JSON (using the text/plain CORS-bypass trick)
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();

    // Map internal field names to columns
    // formData structure: { name, phone, svnr, birthDate, date, comments, service }
    const row = [
      timestamp,
      data.name,
      data.phone,
      data.svnr,
      data.birthDate,
      data.service,
      data.date,
      data.comments,
      "Neu"
    ];
    
    sheet.appendRow(row);

    // Email Notification
    let emailBody = "Neue Terminanfrage am Kai:\n\n";
    emailBody += `Name: ${data.name}\n`;
    emailBody += `Telefon: ${data.phone}\n`;
    emailBody += `SVNr: ${data.svnr}\n`;
    emailBody += `Geburtsdatum: ${data.birthDate}\n`;
    emailBody += `Untersuchung: ${data.service}\n`;
    emailBody += `Wunschdatum: ${data.date}\n`;
    emailBody += `Kommentare: ${data.comments}\n\n`;
    emailBody += `Link zur Tabelle: ${ss.getUrl()}`;

    MailApp.sendEmail(NOTIFICATION_EMAIL, "Terminanfrage: " + data.name, emailBody);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
