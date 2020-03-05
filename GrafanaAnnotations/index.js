const tl = require('vso-task-lib');
const axios=require('axios');

var auth = tl.getEndpointAuthorization(tl.getInput("GrafanaService",true),true);
var url = tl.getEndpointUrl(tl.getInput("GrafanaService",true),true);
var tags = tl.getInput('Tags',true);
var Annotation = tl.getInput("Annotation",true);



const tag = tags.replace(/\s/g, '') 
const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',
'Authorization': `Bearer ${auth.parameters.apitoken}` } };
const body = {"time":Date.now(),"tags":tag.split(","),"text":`${Annotation}`};

console.log(body)

axios.post(`${url}api/annotations`,body, config)
.then(r => r.data)
.then(data=>console.log(data))
.catch(error=>console.log(error));