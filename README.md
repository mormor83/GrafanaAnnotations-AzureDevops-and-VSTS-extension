# GrafanaAnnotations-AzureDevops-and-VSTS-extension

**Summary**  
Adding a Grafana annotations extensions for Azure Devops

## Release Notes
* 1.0.0
    * First release

## What’s the problem?
When needing to add an annotations to Grafana once a release is finished. 

## Solution:
The Release task allow you to add a service connection with the following:
* Endpoint - The Grafana URL ( will be concat later with /api/Annotations )
* APIkey - The Admin API key generated from Grafana

and will get the following parametrs:
* Tags - comma separated list of tags to send e.g (Deployments , $(yourVar) )
* Annotation - The Annotation text to send.
