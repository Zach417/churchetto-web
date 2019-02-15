module.exports = [{
  label: "Monthly Birthday Report",
  path: "birthday-report",
  parameters: [{
    label: "Church",
    name: "church",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'query',
      from: 'churches',
    }
  },{
    label: "Month",
    name: "month",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'list',
      list:["January","February","March","April","May","June","July","August","September","October","November","December"],
    }
  }],
  template: {
    parent: 'p::church',
    reportHeader: `
      <div style='display:inline-block;width:100%;border-bottom:1px solid #ccc;'>
        <div style='padding:0px;'>
          <span style='text-decoration:none;color:#3b3a36;font-weight:700;display:inline-block;padding:10px 5px;font-size:32px;'>Churchetto | Reports</span>
          <img style='height:60px;float:left;' src='https://www.churchetto.com/img/logo-icon'>
        </div>
      </div>
    `,
    sections: [{
      data: 'parent.members',
      filter: 'param::month==monthName::dateOfBirth',
      sectionHeader: `
        <h2>Monthly Birthday Report - [param::month]</h2>
      `,
      repeater: `
        <div>
          <h3>[lastName], [firstName]</h3>
          <div>Email: [email] | Phone: [phone.main]</div>
          <div>
            Member Since: [format::date,dateOfMembership,MM/DD/YYYY] |
            Birthday: [format::date,dateOfBirth,MM/DD/YYYY]</div>
        </div>
      `,
    }],
    reportFooter: `
      <div style="padding-top:25px"></div>
    `,
  }
}, {
  label: "Member Directory",
  path: "member-directory",
  parameters: [{
    label: "Church",
    name: "church",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'query',
      from: 'churches',
    }
  }],
  template: {
    parent: 'p::church',
    reportHeader: `
      <div style='display:inline-block;width:100%;border-bottom:1px solid #ccc;'>
        <div style='padding:0px;'>
          <span style='text-decoration:none;color:#3b3a36;font-weight:700;display:inline-block;padding:10px 5px;font-size:32px;'>Churchetto | Reports</span>
          <img style='height:60px;float:left;' src='https://www.churchetto.com/img/logo-icon'>
        </div>
      </div>
    `,
    sections: [{
      data: 'parent.members',
      sectionHeader: `
        <h2>Member Directory</h2>
      `,
      repeater: `
        <div>
          <h3>[lastName], [firstName]</h3>
          <div>Email: [email] | Phone: [phone.main]</div>
          <div>
            Member Since: [format::date,dateOfMembership,MM/DD/YYYY] |
            Birthday: [format::date,dateOfBirth,MM/DD/YYYY]</div>
        </div>
      `,
    }],
    reportFooter: `
      <div style="padding-top:25px"></div>
    `,
  }
}, {
  label: "Attendance Report",
  path: "attendance-report",
  parameters: [{
    label: "Church",
    name: "church",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'query',
      from: 'churches',
    }
  }, {
    label: "Start Date (MM/DD/YYYY)",
    name: "start",
    type: "date",
  }, {
    label: "End Date (MM/DD/YYYY)",
    name: "end",
    type: "date",
  }],
  template: {
    parent: 'p::church',
    reportHeader: `
      <div style='display:inline-block;width:100%;border-bottom:1px solid #ccc;'>
        <div style='padding:0px;'>
          <span style='text-decoration:none;color:#3b3a36;font-weight:700;display:inline-block;padding:10px 5px;font-size:32px;'>Churchetto | Reports</span>
          <img style='height:60px;float:left;' src='https://www.churchetto.com/img/logo-icon'>
        </div>
      </div>
    `,
    sections: [{
      data: 'parent.attendance',
      filter: 'param::start<date&&param::end>date',
      sectionHeader: `
        <h2>Attendance Report - [param::start] - [param::end]</h2>
      `,
      repeater: `
        <div>
          <h3>[format::date,date,MM/DD/YYYY]</div>
          <div>Count: [count]</div>
          <div>Category: [category]</div>
        </div>
      `,
    }],
    reportFooter: `
      <div style="padding-top:25px"></div>
    `,
  }
}, {
  label: "Member Contributions",
  path: "member-contributions",
  parameters: [{
    label: "Church",
    name: "church",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'query',
      from: 'churches',
    }
  }, {
    label: "Start Date (MM/DD/YYYY)",
    name: "start",
    type: "date",
  }, {
    label: "End Date (MM/DD/YYYY)",
    name: "end",
    type: "date",
  }, {
    label: "Is Tax Deductible?",
    name: "isTaxDeductible",
    type: "boolean",
    value: '',
    options: {
      type: 'list',
      list:["true", "false"],
    }
  }],
  template: {
    parent: 'p::church',
    reportHeader: `
      <div style='display:inline-block;width:100%;border-bottom:1px solid #ccc;'>
        <div style='padding:0px;'>
          <span style='text-decoration:none;color:#3b3a36;font-weight:700;display:inline-block;padding:10px 5px;font-size:32px;'>Churchetto | Reports</span>
          <img style='height:60px;float:left;' src='https://www.churchetto.com/img/logo-icon'>
        </div>
      </div>
    `,
    sections: [{
      data: 'parent.contributions',
      groupBy: 'memberId',
      filter: 'param::start<date&&param::end>date&&param::isTaxDeductible==isTaxDeductible',
      sectionHeader: `
        <h2>Member Contributions</h2>
      `,
      repeater: `
        <div>
          <h3>[first//assoc::members,lastName], [first//assoc::members,firstName]</h3>
          <div>Period: [min//format::date,date,MM/DD/YYYY] - [max//format::date,date,MM/DD/YYYY]</div>
          <div><b>
            Total Contributions: $[sum//format::money,amount]
          </b></div>
        </div>
      `,
    }],
    reportFooter: `
      <div style="padding-top:25px"></div>
    `,
  }
}, {
  label: "Tax Statement",
  path: "tax-statement",
  parameters: [{
    label: "Church",
    name: "church",
    type: "select",
    isRequired: true,
    value: '',
    options: {
      type: 'query',
      from: 'churches',
    }
  }, {
    label: "Start Date (MM/DD/YYYY)",
    name: "start",
    type: "date",
  }, {
    label: "End Date (MM/DD/YYYY)",
    name: "end",
    type: "date",
  }, {
    label: "Is Tax Deductible?",
    name: "isTaxDeductible",
    type: "boolean",
    value: '',
    options: {
      type: 'list',
      list:["true", "false"],
    }
  }],
  template: {
    parent: 'p::church',
    sections: [{
      data: 'parent.contributions',
      groupBy: 'memberId',
      filter: 'param::start<date&&param::end>date&&param::isTaxDeductible==isTaxDeductible',
      repeater: `
        <div style="page-break-after: always">
          <h1>[parent.name]</h1>
          <h2>Statement of Contributions</h2>
          <p>
            Thank you so much for your generosity. Please keep this document for tax purposes. No goods or services were provided in return for these contributions.
          </p>
          <p>
            Reporting period:
            [format::string,param::start,Beginning of time] -
            [format::string,param::end,End of time]
          </p>
          <div style="margin-bottom:25px">
            <div>[parent.name]</div>
            <div>[parent.address.line1]</div>
            <div>[parent.address.line2]</div>
            <div>
              [parent.address.city],
              [parent.address.state]
              [parent.address.zip]
            </div>
            <div>
              [parent.website] |
              [parent.phone.main]
            </div>
          </div>
          <div style="border-top:1px solid #ccc;padding-bottom:15px;border-bottom:1px solid #ccc">
            <h3>
              [first//assoc::members,firstName]
              [first//assoc::members,lastName]
            </h3>
            <div style="margin-bottom:15px">
              <div>[first//assoc::members,address.line1]</div>
              <div>[first//assoc::members,address.line2]</div>
              <div>
                [first//assoc::members,address.city],
                [first//assoc::members,address.state]
                [first//assoc::members,address.zip]
              </div>
            </div>
            <div>Contribution Period: [min//format::date,date,MM/DD/YYYY] - [max//format::date,date,MM/DD/YYYY]</div>
            <div>
              <b>
                Total Contributions: $[sum//format::money,amount]
              </b>
            </div>
          </div>
          <p style="font-size:11px;color:grey;font-style:italic;margin-top:15px;">
            Report generated via Churchetto.com - Church Management Tools
          </p>
        </div>
      `,
    }],
    reportFooter: `
      <div style="padding-top:25px"></div>
    `,
  }
}]
