/**
 * This will add a sidebar to either a Google Doc, Google Sheet or Google Slide 
 * to open the user guide for that process in a separate window.
 */

// This is the URL to the documentation for the process
const USER_GUIDE_URL_ = "https://script.google.com/home/start";

// This is the name for the menu item within the application.
const MENU_NAME_ = "Scripts";

// Name of the HTML file used for the sidebar
const HTML_SIDEBAR_NAME_ = "sidebar";

/**
 * Runs when the document is opened, creating the menu item in the ribbon. 
 * This is a simple trigger and it will be triggered automatically when a 
 * user opens a spreadsheet, document, or presentation.
 * 
 * @returns {void}
 */
function onOpen() {
  // Gets the document type and ui
  var docDetails = getDocDetails_();

  // Creates the menu item for the ribbon
  var menu = docDetails["ui"].createMenu(MENU_NAME_);

  // Allows us to add specific items to our menu based on application type
  switch (docDetails.type) {
    case "SHEETS":
      // menu.addItem("Sheet Function", "sheetFunction");
      break;
    
    case "DOCS":
      // menu.addItem("Document Function", "docFunction");
      break;
    
    case "SLIDES":
      // menu.addItem("Slides Function", "slidesFunction");
      break;

    default:
      console.log("Application type not listed");
  }

  // Adds the item to show the sidebar with the user guide
  menu.addItem("Show User Guide", "showSidebar");

  // Adds the menu to the ui
  menu.addToUi();
}

/**
 * Description of the object returned from get getDocDetails_().
 * @typedef {Object} DocDetails
 * @property {Ui} ui - Google Application UI
 * @property {string} type - Type of Google document
 */

/**
 * This function will determine the type of Google App and then
 * return an object with the ui and type.
 * 
 * @returns {DocDetails}
 */
function getDocDetails_() {
  // Creates an object
  var docDetails = {};

   // Check if it is a Google Sheet we are working in.
  try {
    docDetails.ui = SpreadsheetApp.getUi();
    docDetails.type = "SHEETS";
  } catch(e) {
    console.log("Not Spreadsheet");
  }

  // Check if it is a Google Doc we are working in.
  try {
    docDetails.ui = DocumentApp.getUi();
    docDetails.type = "DOCS";
  } catch(e) {
    console.log("Not Document");
  }

  // Check if it is a Google Slide we are working in.
  try {
    docDetails.ui = SlidesApp.getUi();
    docDetails.type = "SLIDES";
  } catch(e) {
    console.log("Not Slides");
  }

  return docDetails;
}

/**
 * This creates a sidebar for the current application based from sidebar.html
 * 
 * @returns {void}
 */
function showSidebar() {
  // Gets the document type and ui
  var docDetails = getDocDetails_();

  // Creates the HTML output form the sidebar.html file
  var html = HtmlService.createHtmlOutputFromFile(HTML_SIDEBAR_NAME_)
      .setTitle('Sidebar');

  // Displays the given sidebar to the user
  docDetails["ui"].showSidebar(html);
}

/**
 * This opens the user guide in a new tab
 * 
 * @returns {void}
 */
function openUserGuide() {
  // Gets the document type and ui
  var docDetails = getDocDetails_();

  // Creates the HTML output to open up the user guide in a new tab
  var html = HtmlService.createHtmlOutput('<script>window.open("' + USER_GUIDE_URL_ + '");google.script.host.close();</script>');

  // Shows a modal to the user
  docDetails["ui"].showModalDialog(html, "Redirecting...");
}
