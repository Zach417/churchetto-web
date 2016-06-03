module.exports = [{
  label: "Monthly Birthday Report",
  path: "birthday-report",
  parameters: [{
    label: "Month",
    name: "month",
    type: "select",
    options: ["All","January","February","March","April","May","June","July","August","September","October","November","December"]
  }],
}, {
  label: "Tax Statement",
  path: "tax-statement",
  parameters: [{
    label: "Start Date (MM/DD/YYYY)",
    name: "start",
    type: "date",
  }, {
    label: "End Date (MM/DD/YYYY)",
    name: "end",
    type: "date",
  }],
}, {
  label: "Member Directory",
  path: "member-directory",
  parameters: [],
}, {
  label: "Mailing Labels",
  path: "mailing-labels",
  parameters: [],
}, {
  label: "Monthly Death Report",
  path: "death-report",
  parameters: [{
    label: "Start Date (MM/DD/YYYY)",
    name: "start",
    type: "date",
  }, {
    label: "End Date (MM/DD/YYYY)",
    name: "end",
    type: "date",
  }],
}]
