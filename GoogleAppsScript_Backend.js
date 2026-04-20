/**
 * Google Apps Script Backend for "Röntgen am Kai" Form (v2 - Split Names)
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this code.
 * 4. Click "Deploy" -> "New Deployment".
 * 5. Select Type: "Web App".
 * 6. Set "Who has access" to "Anyone".
 * 7. Click Deploy and Copy the new URL (if it changed).
 */

function doPost(e) {
  // DEINE TABELLEN-ID (Bitte hier deine ID eintragen, falls sie anders ist)
  const SPREADSHEET_ID = '1ZyCnSzdndq4Z2iKzz8M0gq1K35byKMHGrF7vEobQWmw';
  const SHEET_NAME = 'Terminanfragen';           
  const NOTIFICATION_EMAIL = 'ordination@roentgen-am-kai.at'; 
  
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    
    // Set headers if the sheet was just created or is empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Zeitstempel', 'Vorname', 'Nachname', 'Telefon', 'SVNr', 'Geburtsdatum', 'Untersuchung', 'Wunschdatum', 'Kommentare', 'Status'];
      sheet.appendRow(headers);
    }

    if (!e.postData || !e.postData.contents) {
      throw new Error("No data received");
    }

    const data = JSON.parse(e.postData.contents);
    
    // Mapping the data (matching the React formData structure)
    const row = [
      new Date(), 
      data.firstName || '', 
      data.lastName || '', 
      data.phone || '', 
      data.svnr || '', 
      data.birthDate || '', 
      data.service || '', 
      data.date || '', 
      data.comments || '', 
      "Neu"
    ];
    
    sheet.appendRow(row);

    // Email Notification
    const fullName = (data.firstName || '') + " " + (data.lastName || '');
    MailApp.sendEmail(NOTIFICATION_EMAIL, "Terminanfrage: " + fullName, 
      "Neue Terminanfrage am Kai:\n\n" + 
      "Name: " + fullName + "\n" +
      "Telefon: " + (data.phone || '') + "\n" +
      "SVNr: " + (data.svnr || '') + "\n" +
      "Geburtsdatum: " + (data.birthDate || '') + "\n" +
      "Untersuchung: " + (data.service || '') + "\n" +
      "Wunschdatum: " + (data.date || '') + "\n" +
      "Kommentare: " + (data.comments || '')
    );

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
