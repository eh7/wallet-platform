curl -s http://127.0.0.1:8545/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_getBalance","params":["0x7574b8D4C0C2566b671C530d710821EB6694bE0C", "latest"],"id":1,"jsonrpc":"2.0"}'

