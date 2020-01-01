#!/usr/bin/env node

const fs = require('fs');
const got = require('got');

const currentDate = function() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}();

const extensions = [
    'ms-vscode.azure-account',
    'ms-vsts.team',
    'ms-azuretools.vscode-azurefunctions',
    'ms-azuretools.vscode-azureappservice',
    'vsciot-vscode.azure-iot-toolkit',
    'ms-azuretools.vscode-cosmosdb',
    'msazurermtools.azurerm-vscode-tools',
    'ms-toolsai.vscode-ai',
    'ms-vscode.azurecli',
    'ms-azuretools.vscode-azurestorage',
    'ms-vscode.vscode-node-azure-pack',
    'vsciot-vscode.azure-iot-edge',
    'ms-azure-devops.azure-pipelines',
    'azuredevspaces.azds',
    'ms-azuretools.vscode-azureterraform',
    'usqlextpublisher.usql-vscode-ext',
    'ms-azuretools.vscode-logicapps',
    'vsciot-vscode.vscode-iot-workbench',
    'VisualStudioOnlineApplicationInsights.application-insights',
    'ms-kubernetes-tools.vscode-aks-tools',
    'vsciot-vscode.azure-iot-tools',
    'ms-azuretools.vscode-apimanagement',
    'AzurePolicy.azurepolicyextension',
    'AzBlockchain.azure-blockchain',
    'ms-bigdatatools.vscode-asa',
    'ms-vscode.azure-sphere-tools',
    'ms-mssql.sqlops-debug',
    'ms-azuretools.vscode-azureeventgrid',
    'ms-vscode-deploy-azure.azure-deploy',
    'ms-mssql.mssql'
]

async function getInstallCount(itemName) {
    const res = await got(`https://vsmarketplacebadge.apphb.com/installs/${itemName}.svg`)
    const body = res.body;
    const lastClosingTextTag = body.lastIndexOf('</text>');
    const tmp = body.slice(0, lastClosingTextTag).split('>');

    return [itemName, tmp[tmp.length -1]]
}

(async function() {
    Promise.all(extensions.map(getInstallCount)).then((values) => {
        values.map(([name, count]) => {
            fs.appendFileSync(`./data/${name}.csv`, `${currentDate},${count}\n`);
        })

    });
})()

