const SPREADSHEET_ID = '1ZyCnSzdndq4Z2iKzz8M0gq1K35byKMHGrF7vEobQWmw';
const SHEET_NAME = 'Terminanfragen';

/**
 * Adds a custom menu to the Google Sheet when opened
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Kai-Management')
      .addItem('✅ Markierte Zeile als erledigt setzen', 'markSelectedAsDone')
      .addItem('📅 Alles korrigieren (Layout & Sortierung)', 'fullMaintenance')
      .addSeparator()
      .addItem('🗑️ Alle erledigten (grünen) Zeilen löschen', 'cleanupDoneRows')
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
      const headers = ['Zeitstempel', 'Vorname', 'Nachname', 'Telefon', 'Email', 'SVNr', 'Geburtsdatum', 'Kasse', 'Untersuchung', 'Wunschdatum', 'Kommentare', 'Status'];
      sheet.appendRow(headers);
    }

    const data = JSON.parse(e.postData.contents);
    const rowData = [
      new Date(), 
      data.firstName || '', 
      data.lastName || '', 
      data.phone || '', 
      data.email || '', 
      data.svnr || '', 
      data.birthDate || '', 
      data.insurance || '', 
      data.service || '', 
      data.date || '', 
      data.comments || '', 
      "Neu"
    ];
    
    // INSERT AT TOP (Direct Method)
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
    
    // Refresh Layout
    applyProfessionalLayout();

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

/**
 * Combined maintenance: Re-applies layout and sorting
 */
function fullMaintenance() {
  sortSheetByDate();
  applyProfessionalLayout();
  SpreadsheetApp.getUi().alert('Tabelle wurde erfolgreich aktualisiert.');
}

/**
 * Marks currently selected row as "Erledigt"
 */
function markSelectedAsDone() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const activeRow = ss.getActiveRange().getRow();
  
  if (activeRow < 2) return;
  
  sheet.getRange(activeRow, 12).setValue('Erledigt');
  applyProfessionalLayout();
}

/**
 * Sorts sheet by timestamp descending
 */
function sortSheetByDate() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet.getLastRow() > 1) {
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
    range.sort({column: 1, ascending: false});
  }
}

/**
 * Deletes all rows marked as "Erledigt"
 */
function cleanupDoneRows() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][11] && data[i][11].toString().toLowerCase() === 'erledigt') {
      sheet.deleteRow(i + 1);
    }
  }
}

/**
 * Applies headers, dropdowns, and conditional formatting
 */
function applyProfessionalLayout() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Style Headers
  sheet.setFrozenRows(1);
  const headerRange = sheet.getRange("A1:L1");
  headerRange.setBackground("#8B2323").setFontColor("#FFFFFF").setFontWeight("bold").setHorizontalAlignment("center");
  sheet.autoResizeColumns(1, 12);
  
  // Status Dropdown range
  const statusRange = sheet.getRange("L2:L1000");
  
  // Apply Dropdown
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Neu', 'In Bearbeitung', 'Erledigt'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  
  // Apply Conditional Formatting
  const rules = [];
  
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Erledigt")
    .setBackground("#D9EAD3")
    .setRanges([statusRange])
    .build());
    
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("In Bearbeitung")
    .setBackground("#FFF2CC")
    .setRanges([statusRange])
    .build());
    
  sheet.setConditionalFormatRules(rules);
}
