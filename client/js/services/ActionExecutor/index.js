var S = require("string");
var moment = require("moment");
var Entities = require("./entities");

function getParameterValue (parameters, word) {
    var parameterName = word.replace("parameters::","");

    for (var i = 0; i < parameters.length; i++) {
        if (!parameterName.split("::")[0].startsWith(parameters[i].name)) {
            continue;
        }

        if (!parameters[i].value || parameters[i].value == "undefined") {
            return;
        }

        if (parameters[i].type == "date") {
            if (S(parameterName).contains("::add::")) {
                var value = parseInt(parameterName.split("::add::")[1].split("::")[1]);
                var addType = parameterName.split("::add::")[1].split("::")[0];
                return moment(parameters[i].value.toString()).add(value, addType).toDate();
            } else if (S(parameterName).contains("::subtract::")) {
                var value = parseInt(parameterName.split("::subtract::")[1].split("::")[1]);
                var addType = parameterName.split("::subtract::")[1].split("::")[0];
                return moment(parameters[i].value.toString()).subtract(value, addType).toDate();
            } else {
                return moment(parameters[i].value.toString()).toDate();
            }
        } else if (parameters[i].type == "string") {
            return parameters[i].value;
        } else {
            return parameters[i].value;
        }
    }
}

function generateKeyValue (parameters, value) {
    var result = "";
    var words = value.split(" ");
    for (var i = 0; i < words.length; i++) {
        if (words[i].startsWith("parameters::")) {
            result += " " + getParameterValue(parameters, words[i]);
        } else {
            result += " " + words[i];
        }
    }

    return result.substr(1);
}

function generateObject (attributes, parameters) {
    var result = {};

    for (var i = 0; i < attributes.length; i++) {
        if (S(attributes[i].value).contains("::")) {
            var value = generateKeyValue(parameters, attributes[i].value);
            if (value && value != "undefined") {
                result[attributes[i].name] = value;
            }
        } else {
            result[attributes[i].name] = attributes[i].value;
        }
    }

    return result;
}

function executeStep (step, parameters) {
    var object = generateObject(step.attributes, parameters);
    Entities[step.entity].steps[step.type](object);
}

function executeAllSteps(steps, parameters) {
    for (var i = 0; i < steps.length; i ++) {
        executeStep(steps[i], parameters);
    }
}

function ActionExecutor (action) {
    this.execute = function () {
        executeAllSteps(action.steps, action.parameters);
    }
}

module.exports = ActionExecutor;
