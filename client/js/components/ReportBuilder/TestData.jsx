module.exports = {
  _id: "570b18d28f1c32d25e5a1750",
  name: "Attendance by month",
  style: {
    backgroundColor: "#fff"
  },
  size: {
    x: "8.27in",
    y: "11in"
  },
  segments: {
    page: {
      header: [
        {
          name: "PH1",
          style: {
            height: ".5in"
          },
          objects: [
            {
              style: {
                fontSize: "22px",
                textAlign: "left",
                top: "0in",
                left: "0in",
                width: "3.25in",
                height: ".5in"
              },
              value: "Attendance by month"
            }, {
              style: {
                fontSize: "22px",
                textAlign: "right",
                top: "0in",
                left: "4.5in",
                width: "3.25in",
                height: ".5in"
              },
              value: "{report.data.runTime.today}"
            }
          ]
        }
      ],
      footer: []
    },
    report: {
      header: [
        {
          name: "RH1",
          style: {
            height: ".25in"
          },
          objects: [
            {
              style: {
                fontSize: "14px",
                textAlign: "left",
                top: "0in",
                left: "0in",
                width: "3.25in",
                height: ".25in"
              },
              value: "A gorgeous report by Zach"
            }
          ]
        }
      ],
      footer: [
        {
          name: "PF1",
          style: {
            height: ".25in"
          },
          objects: [
            {
              style: {
                fontSize: "14px",
                textAlign: "center",
                top: "0in",
                left: "0in",
                width: "8.25in",
                height: ".25in"
              },
              value: "Page {report.data.runTime.pageNumber.current} of {report.data.runTime.pageNumber.total}"
            }
          ]
        }
      ]
    },
    body: {
      groups: [
        {
          entity: "church",
          attribute: "name",
          header: [
            {
              name: "G1H1",
              style: {
                height: ".25in"
              },
              objects: [
                {
                  style: {
                    fontSize: "18px",
                    textAlign: "left",
                    top: "0in",
                    left: "0in",
                    width: "8.25in",
                    height: ".25in"
                  },
                  value: "{report.data.church.name}"
                }
              ]
            }, {
              name: "G1H2",
              style: {
                height: ".25in"
              },
              objects: [
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "left",
                    top: "0in",
                    left: ".25in",
                    width: "2.5in",
                    height: ".25in"
                  },
                  value: "Date"
                }, {
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "left",
                    top: "0in",
                    left: "3.25in",
                    width: "2.5in",
                    height: ".25in"
                  },
                  value: "Count"
                }
              ]
            }
          ],
          footer: [
            {
              name: "GF1",
              style: {
                height: ".25in"
              },
              objects: [
                {
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "left",
                    top: "0in",
                    left: "3.25in",
                    width: "2.5in",
                    height: ".25in"
                  },
                  value: "{report.data.church.attendance.count.sum}"
                }
              ]
            }
          ]
        }
      ],
      details: [
        {
          name: "D1",
          style: {
            height: ".25in"
          },
          objects: [
            {
              style: {
                fontSize: "14px",
                textAlign: "left",
                top: "0in",
                left: ".25in",
                width: "2.5in",
                height: ".25in"
              },
              value: "{report.data.church.attendance.date}"
            }, {
              style: {
                fontSize: "14px",
                textAlign: "left",
                top: "0in",
                left: "3.25in",
                width: "2.5in",
                height: ".25in"
              },
              value: "{report.data.church.attendance.count}"
            }
          ]
        }
      ]
    }
  },
  data: {
    entity: {
      name: "church",
      fields: ["name", "attendance"]
    }
  }
}
