#!/bin/bash

list=( "AzBlockchain.azure-blockchain" "azuredevspaces.azds" "AzurePolicy.azurepolicyextension" "ms-azure-devops.azure-pipelines" "ms-azuretools.vscode-apimanagement" "ms-azuretools.vscode-azureappservice" "ms-azuretools.vscode-azureeventgrid" "ms-azuretools.vscode-azurefunctions" "ms-azuretools.vscode-azurestorage" "ms-azuretools.vscode-azureterraform" "ms-azuretools.vscode-cosmosdb" "ms-azuretools.vscode-logicapps" "ms-bigdatatools.vscode-asa" "ms-kubernetes-tools.vscode-aks-tools" "ms-mssql.mssql" "ms-mssql.sqlops-debug" "ms-toolsai.vscode-ai" "ms-vscode-deploy-azure.azure-deploy" "ms-vscode.azure-account" "ms-vscode.azure-sphere-tools" "ms-vscode.azurecli" "ms-vscode.vscode-node-azure-pack" "ms-vsts.team" "msazurermtools.azurerm-vscode-tools" "usqlextpublisher.usql-vscode-ext" "VisualStudioOnlineApplicationInsights.application-insights" "vsciot-vscode.azure-iot-edge" "vsciot-vscode.azure-iot-toolkit" "vsciot-vscode.azure-iot-tools" "vsciot-vscode.vscode-iot-workbench" )

mkdir -p ./graphs

for name in "${list[@]}"
do
    $(gnuplot -persist <<EOF
        set title '$name'
        set datafile separator ','
        set grid
        set term png
        set output './graphs/$name.png'
        plot './data/$name.csv' using 2 w lp title "")
done
