let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let ulEl = document.getElementById("ul-el");

inputBtn.addEventListener("click", saveInput, false);
deleteBtn.addEventListener("dblclick", clearData, false);
tabBtn.addEventListener("click", saveTab, false);

if (leadsFromLocalStorage) {
  myLeads = JSON.parse(localStorage.getItem("myLeads"));
  render(myLeads);
}

function render(leads) {
  let uLNode = createULNode(leads);
  uLNode.id = "ul-el";
  ulEl = document.getElementById("ul-el");
  ulEl.replaceWith(uLNode);
}

function createULNode(leads) {
  let newUL = document.createElement("ul");
  console.log("createULNode");
  console.log(leads);
  for (let i = 0; i < leads.length; i++) {
    newUL.appendChild(createListNode(leads, i));
  }
  return newUL;
}

function createListNode(leads, i) {
  let textEntry = leads[i];
  let url = textEntry;
  let li = document.createElement("li");
  let a = document.createElement("a");
  let textnode = document.createTextNode(textEntry);
  if (!textEntry.startsWith("http://") && !textEntry.startsWith("https://")) {
    url = `https://${textEntry}`;
  }
  a.href = url;
  a.target = "_blank";
  a.appendChild(textnode);
  li.appendChild(a);
  return li;
}

function updateListEvent(input) {
  console.log("updateListEvent");
  //console.log(input);
  if (input !== undefined) {
    myLeads.push(input);
    render(myLeads);
  }
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

function clearData() {
  console.log("clearData");
  console.log(myLeads);
  localStorage.clear();
  myLeads = [];

  render(myLeads);
}

function saveTab() {
  console.log("saveTab");
  getCurrentTab().then(function (url) {
    updateListEvent(url);
  });

  //updateListEvent(getCurrentTab);
}

function saveInput() {
  console.log("inputEl.value");
  console.log(inputEl.value);
  updateListEvent(inputEl.value);

  inputEl.value = "";
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab.url;
}
