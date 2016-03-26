var ButtonDanger = require('./ButtonDanger/Index.jsx');
var ButtonPrimary = require('./ButtonPrimary/Index.jsx');
var ButtonSecondary = require('./ButtonSecondary/Index.jsx');
var ButtonDefault = require('./ButtonSecondary/Index.jsx');

ButtonDefault.Danger = ButtonDanger;
ButtonDefault.Primary = ButtonPrimary;
ButtonDefault.Secondary = ButtonSecondary;

module.exports = ButtonDefault;
