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
    
    // Header check
    if (sheet.getLastRow() === 0) {
      const headers = ['Zeitstempel', 'Vorname', 'Nachname', 'Telefon', 'SVNr', 'Geburtsdatum', 'Untersuchung', 'Wunschdatum', 'Kommentare', 'Status'];
      sheet.appendRow(headers);
    }

    const data = JSON.parse(e.postData.contents);
    const rowData = [new Date(), data.firstName || '', data.lastName || '', data.phone || '', data.svnr || '', data.birthDate || '', data.service || '', data.date || '', data.comments || '', "Neu"];
    
    // THE DIRECT INSERT METHOD (Always Row 2)
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
    
    // Apply Formatting & Dropdowns immediately
    applyProfessionalLayout();

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

/**
 * Combined maintenance: Sorts and reapplies layout
 */
function fullMaintenance() {
  sortSheetByDate();
  applyProfessionalLayout();
  SpreadsheetApp.getUi().alert('Fertig! Die Tabelle ist nun sortiert und das Layout wurde aufgefrischt.');
}

/**
 * Markiert die aktuell ausgewählte Zeile als Erledigt
 */
function markSelectedAsDone() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const activeRow = ss.getActiveRange().getRow();
  
  if (activeRow < 2) {
    SpreadsheetApp.getUi().alert('Bitte wähle eine Zeile unter dem Header aus.');
    return;
  }
  
  sheet.getRange(activeRow, 10).setValue('Erledigt');
  applyProfessionalLayout();
}

function sortSheetByDate() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet.getLastRow() > 1) {
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
    range.sort({column: 1, ascending: false});
  }
}

function cleanupDoneRows() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][9] && data[i][9].toString().toLowerCase() === 'erledigt') {
      sheet.deleteRow(i + 1);
    }
  }
}

function applyProfessionalLayout() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  sheet.setFrozenRows(1);
  const headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#8B2323").setFontColor("#FFFFFF").setFontWeight("bold").setHorizontalAlignment("center");
  sheet.autoResizeColumns(1, 10);
  
  // Status Dropdowns (Column J)
  const statusRange = sheet.getRange("J2:J1000");
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Neu', 'In Bearbeitung', 'Erledigt'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  
  // Color Formatting
  const rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Erledigt").setBackground("#D9EAD3").build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("In Bearbeitung").setBackground("#FFF2CC").build());
  sheet.setConditionalFormatRules(rules);
}
