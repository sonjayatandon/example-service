#!/bin/bash
export PRIVATE_IP=$(ip addr show eth0 | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}')
cat >./reg.json<<EOF
{
 "ID":"products-service",
 "Name":"products-service",
 "Address":"$PRIVATE_IP",
 "Port":5000
 }
EOF
curl -X PUT --data-binary @reg.json consul:8500/v1/agent/service/register
node "/usr/src/app/src/index.js"

