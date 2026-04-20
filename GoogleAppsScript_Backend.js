/**
 * Google Apps Script Backend for "Röntgen am Kai" Form (PRO VERSION)
 * 
 * FEATURES:
 * - Newest entries are inserted at TOP (Row 2)
 * - Custom Menu in Google Sheets for "Kai-Management"
 * - Cleanup function to delete completed entries
 */

const SPREADSHEET_ID = '1ZyCnSzdndq4Z2iKzz8M0gq1K35byKMHGrF7vEobQWmw';
const SHEET_NAME = 'Terminanfragen';
const NOTIFICATION_EMAIL = 'ordination@roentgen-am-kai.at';

/**
 * Adds a custom menu to the Google Sheet when opened
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Kai-Management')
      .addItem('✅ Erledigte Zeilen löschen', 'cleanupDoneRows')
      .addSeparator()
      .addItem('🎨 Layout auffrischen', 'applyProfessionalLayout')
      .addToUi();
}

/**
 * Handles the form submission from the website
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    
    // Header setup if empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Zeitstempel', 'Vorname', 'Nachname', 'Telefon', 'SVNr', 'Geburtsdatum', 'Untersuchung', 'Wunschdatum', 'Kommentare', 'Status'];
      sheet.appendRow(headers);
      applyProfessionalLayout();
    }

    const data = JSON.parse(e.postData.contents);
    
    // INSERT AT TOP (Row 2)
    sheet.insertRowBefore(2);
    
    const rowData = [
      new Date(), 
      data.firstName || '', 
      data.lastName || '', 
      data.phone || '', 
      data.svnr || '', 
      data.birthDate || '', 
      data.service || '', 
      data.date || '', 
      data.comments || '', 
      "Neu" // Status initial
    ];
    
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
    
    // Email Notification
    const fullName = (data.firstName || '') + " " + (data.lastName || '');
    MailApp.sendEmail(NOTIFICATION_EMAIL, "⚠️ Neu: Terminanfrage " + fullName, 
      "Details:\n" + JSON.stringify(data, null, 2) + "\n\nLink: " + ss.getUrl());

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Deletes all rows where the "Status" column is set to "Erledigt" (case insensitive)
 */
function cleanupDoneRows() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const ui = SpreadsheetApp.getUi();
  
  // Find index of Status column (typically the last one)
  const statusColumnIndex = 9; // Column J (0-based)
  let deletedCount = 0;

  // Iterate backwards to not mess up indices during deletion
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][statusColumnIndex] && data[i][statusColumnIndex].toString().toLowerCase() === 'erledigt') {
      sheet.deleteRow(i + 1); // +1 because rows are 1-based
      deletedCount++;
    }
  }
  
  ui.alert('Kai-Management', deletedCount + ' erledigte Zeilen wurden erfolgreich gelöscht.', ui.ButtonSet.OK);
}

/**
 * Formats the sheet to look professional
 */
function applyProfessionalLayout() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Freeze Header
  sheet.setFrozenRows(1);
  
  // Header Style
  const headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#8B2323")
             .setFontColor("#FFFFFF")
             .setFontWeight("bold")
             .setHorizontalAlignment("center");
             
  // Auto Resize
  sheet.autoResizeColumns(1, 10);
  
  // Conditional Formatting for Status
  const range = sheet.getRange("J2:J1000");
  
  // Clear existing
  range.clearFormat();
  
  const rules = sheet.getConditionalFormatRules();
  
  // Green for Erledigt
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Erledigt")
    .setBackground("#D9EAD3")
    .build());
    
  // Yellow for In Bearbeitung
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("In Bearbeitung")
    .setBackground("#FFF2CC")
    .build());
    
  sheet.setConditionalFormatRules(rules);
}
