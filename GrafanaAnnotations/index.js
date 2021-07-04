const tl = require('vso-task-lib');
const axios = require('axios');
const process = require('process');
 
var auth = tl.getEndpointAuthorization(tl.getInput("GrafanaService", true), true);
var url = tl.getEndpointUrl(tl.getInput("GrafanaService", true), true);
var tags = tl.getInput('Tags', true);
var annotation = tl.getInput("Annotation", true);
 
//remove spaces from tags 
const tag = tags.replace(/\s/g, '');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth.parameters.apitoken}`
    }
};
const body = {
    "time": Date.now(),
    "tags": tag.split(","),
    "text": `${annotation}`
};
 
console.log("******** Parameters ********")
console.log(`Grafana URL: ${url}`)
console.log(`Grafana Tags: ` + tag.split(","))
console.log(`Grafana Annotation: ${annotation}`)
console.log("******** Parameters ********")
 
console.log(`Crating Grafana Annotation in ${url}`)
const maxRetries = 3;
const wait = ms => {
    var targetTime = new Date().getTime() + ms;
    while (targetTime > new Date().getTime()) {
        //do nothing
    }
}
 
const postAnnotations = retryCount => axios.post(`${url}api/annotations`, body, config)
    .then(r => r.data)
    .then(console.log)
    .catch(error => {
        console.log(error);
        console.log(`retring to post annotation (${retryCount})`);
        if (retryCount >= maxRetries) process.exit(1);
        else {
            wait(5000);
            postAnnotations(retryCount + 1);
        }
    });
postAnnotations(1);
