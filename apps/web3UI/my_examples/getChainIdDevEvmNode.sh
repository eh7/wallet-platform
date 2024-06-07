#!/bin/bash

curl -s http://127.0.0.1:8545/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}' > /tmp/tmp.json

RESULT=`cat /tmp/tmp.json | jq .result | sed s/\"//g | sed s/0x/16#/`

#sed -r '/CHANGEME/s/Param([0-9]+)=.*/Param\1=Value\1/' RESULT
#sed s/\"//g RESULT
#${RESULT/\"/}
#RESULT=$(sed "s///g" <<< "$RESULT")
#line=$(sed "s/\"/$/g" <<< "$line")

#RESULT="16#${RESULT}"

echo "chain Id:  $((RESULT))"


#echo $((16#7a69))
#0x7a69
