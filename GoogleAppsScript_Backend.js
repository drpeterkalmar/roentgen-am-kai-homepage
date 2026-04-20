const SPREADSHEET_ID = '1ZyCnSzdndq4Z2iKzz8M0gq1K35byKMHGrF7vEobQWmw';
const SHEET_NAME = 'Terminanfragen';

/**
 * Adds a custom menu to the Google Sheet when opened
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Kai-Management')
      .addItem('📅 Nach Datum sortieren (Neueste oben)', 'sortSheetByDate')
      .addItem('🗑️ Alle erledigten (grünen) Zeilen löschen', 'cleanupDoneRows')
      .addSeparator()
      .addItem('🎨 Layout & Dropdowns auffrischen', 'applyProfessionalLayout')
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
    
    if (!e.postData || !e.postData.contents) {
      throw new Error("No data received");
    }
    
    const data = JSON.parse(e.postData.contents);
    
    // Data mapping
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
      "Neu"
    ];
    
    // 1. Append at the end (safest for bulk handling)
    sheet.appendRow(rowData);
    
    // 2. IMMEDIATELY AUTOSORT (Newest at Row 2)
    sortSheetByDate();
    
    // 3. Ensure formatting and dropdowns are applied
    applyProfessionalLayout();

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

/**
 * Sorts the entire sheet by the first column (Timestamp) descending
 */
function sortSheetByDate() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet.getLastRow() > 1) {
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
    range.sort({column: 1, ascending: false}); // Column 1 (Timestamp), Descending = Newest first
  }
}

/**
 * Deletes all rows where the "Status" column is set to "Erledigt"
 */
function cleanupDoneRows() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  // Iterate backwards to safely delete
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][9] && data[i][9].toString().toLowerCase() === 'erledigt') {
      sheet.deleteRow(i + 1);
    }
  }
}

/**
 * Applies headers, frozen rows, auto-resize, and status dropdowns
 */
function applyProfessionalLayout() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Frozen Row
  sheet.setFrozenRows(1);
  
  // Header Style
  const headerRange = sheet.getRange("A1:J1");
  headerRange.setBackground("#8B2323").setFontColor("#FFFFFF").setFontWeight("bold").setHorizontalAlignment("center");
  
  // Auto Resize Column
  sheet.autoResizeColumns(1, 10);
  
  // 1. SETUP DROPDOWN FOR STATUS (Column J)
  const statusRange = sheet.getRange("J2:J1000");
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Neu', 'In Bearbeitung', 'Erledigt'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  
  // 2. SETUP CONDITIONAL FORMATTING
  const rules = [];
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
