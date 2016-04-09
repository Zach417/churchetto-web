module.exports = {
  name: "Attendance by month",
  style: {
    backgroundColor: "#fff",
  },
  size: {
    x: 1654,
    y: 2339,
  },
  segments: {
    page: {
      header: [{
        name: "PH1",
        style: {
          height: "31px",
        },
        objects: [{
          style: {
            fontSize: "22px",
            textAlign: "left",
            top: "0px",
            left: "0px",
            width: "300px",
            height: "31px",
          },
          value: "Attendance by month",
        },{
          style: {
            fontSize: "22px",
            textAlign: "right",
            top: "0px",
            right: "0px",
            width: "300px",
            height: "31px",
          },
          value: "{report.data.runTime.today}",
        }],
      }],
      footer: [],
    },
    report: {
      header: [{
        name: "RH1",
        style: {
          height: "20px",
        },
        objects: [{
          style: {
            fontSize: "14px",
            textAlign: "left",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "20px",
          },
          value: "A gorgeous report by Zach",
        }],
      }],
      footer: [{
        name: "PF1",
        style: {
          height: "20px",
        },
        objects: [{
          style: {
            fontSize: "14px",
            textAlign: "center",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "20px",
          },
          value: "Page {report.data.runTime.pageNumber.current} of {report.data.runTime.pageNumber.total}",
        }],
      }],
    },
    body: {
      groups: [{
        entity: "church",
        attribute: "name",
        header: [{
          name: "GH1",
          style: {
            height: "20px",
          },
          objects: [{
            style: {
              fontSize: "18px",
              textAlign: "left",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "20px",
            },
            value: "{report.data.church.name}",
          }],
        },{
          name: "GH2",
          style: {
            height: "20px",
          },
          objects: [{
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "left",
              top: "0px",
              left: "15px",
              width: "100%",
              height: "20px",
            },
            value: "Date",
          },{
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "left",
              top: "0px",
              left: "300px",
              width: "100%",
              height: "20px",
            },
            value: "Count",
          }],
        }],
        footer: [{
          name: "GF1",
          style: {
            height: "20px",
          },
          objects: [{
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "left",
              top: "0px",
              left: "300px",
              width: "100%",
              height: "20px",
            },
            value: "{report.data.church.attendance.count.sum}",
          }],
        }],
      }],
      details: [{
        name: "D1",
        style: {
          height: "20px",
        },
        objects: [{
          style: {
            fontSize: "14px",
            textAlign: "left",
            top: "0px",
            left: "15px",
            width: "300px",
            height: "20px",
          },
          value: "{report.data.church.attendance.date}",
        },{
          style: {
            fontSize: "14px",
            textAlign: "left",
            top: "0px",
            left: "300px",
            width: "300px",
            height: "20px",
          },
          value: "{report.data.church.attendance.count}",
        }],
      }],
    },
  },
  data: {
    entity: {
      name: "church",
      fields: ["name","attendance"],
    },
  },
}
