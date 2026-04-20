const SPREADSHEET_ID = '1ZyCnSzdndq4Z2iKzz8M0gq1K35byKMHGrF7vEobQWmw';
const SHEET_NAME = 'Terminanfragen';

/**
 * Erstellt das Menü in Google Sheets
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
 * Verarbeitet die Daten von der Webseite
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); 
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    
    // Header initialisieren, falls Tabelle leer
    if (sheet.getLastRow() === 0) {
      const headers = ['Zeitstempel', 'Vorname', 'Nachname', 'Telefon', 'Email', 'SVNr', 'Geburtsdatum', 'Kasse', 'Untersuchung', 'Kommentare', 'Wunschdatum', 'Status'];
      sheet.appendRow(headers);
    }

    const data = JSON.parse(e.postData.contents);
    
    // EXTREM ROBUSTE DATENZUORDNUNG
    const rowData = [
      new Date(),                                   // A (1) Zeitstempel
      String(data.firstName || ""),                 // B (2) Vorname
      String(data.lastName || ""),                  // C (3) Nachname
      String(data.phone || ""),                     // D (4) Telefon
      String(data.email || ""),                     // E (5) Email
      String(data.svnr || ""),                      // F (6) SVNr
      String(data.birthDate || ""),                 // G (7) Geburtsdatum
      String(data.insurance || ""),                 // H (8) Kasse
      String(data.service || ""),                   // I (9) Untersuchung
      String(data.comments || "").substring(0,500), // J (10) Kommentare
      String(data.date || ""),                      // K (11) Wunschdatum
      "Neu"                                         // L (12) Status
    ];
    
    // Neue Zeile oben einfügen
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
    
    // Layout aktualisieren
    applyProfessionalLayout();

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // FEHLER DIREKT IN DIE TABELLE SCHREIBEN (Falls etwas schiefgeht)
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);
      sheet.insertRowBefore(2);
      sheet.getRange(2, 1).setValue("FEHLER: " + error.toString());
    } catch (e) {}
    
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function fullMaintenance() {
  sortSheetByDate();
  applyProfessionalLayout();
  SpreadsheetApp.getUi().alert('Tabelle wurde erfolgreich aktualisiert.');
}

function markSelectedAsDone() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const activeRow = ss.getActiveRange().getRow();
  if (activeRow < 2) return;
  
  sheet.getRange(activeRow, 12).setValue('Erledigt');
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
    if (data[i][11] && data[i][11].toString().toLowerCase() === 'erledigt') {
      sheet.deleteRow(i + 1);
    }
  }
}

function applyProfessionalLayout() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  sheet.setFrozenRows(1);
  const headerRange = sheet.getRange("A1:L1");
  headerRange.setBackground("#8B2323").setFontColor("#FFFFFF").setFontWeight("bold").setHorizontalAlignment("center");
  sheet.autoResizeColumns(1, 12);
  
  const statusRange = sheet.getRange("L2:L1000");
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Neu', 'In Bearbeitung', 'Erledigt'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  
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
