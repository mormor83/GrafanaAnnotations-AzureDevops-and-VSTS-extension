const tl = require('vso-task-lib');
const axios=require('axios');
const process=require('process');

var auth = tl.getEndpointAuthorization(tl.getInput("GrafanaService",true),true);
var url = tl.getEndpointUrl(tl.getInput("GrafanaService",true),true);
var tags = tl.getInput('Tags',true);
var annotation = tl.getInput("Annotation",true);


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
    "time":Date.now(),
    "tags":tag.split(","),
    "text":`${annotation}`};


console.log("******** Parameters ********")
console.log(`Grafana URL: ${url}`)
console.log(`Grafana Tags: ` +tag.split(","))
console.log(`Grafana Annotation: ${annotation}`)
console.log("******** Parameters ********")

console.log(`Crating Grafana Annotation in ${url}`)
axios.post(`${url}api/annotations`,body, config)
.then(r => r.data)
.then(data=>console.log(data))
.catch(error=>{
    console.log(error);
    process.exit(1);
});