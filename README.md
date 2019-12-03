# Setup

```
npm install
```

# Start
```
node index.js
```
or
```
npm run start
```

# Swagger-ui
## Swagger-ui is accessible under http://localhost:3000/api-docs
## Api is available under http://localhost:3000/api

Example:
http://localhost:3000/api/hello/john/smith

GET example:
```
curl 'http://localhost:3000/api/hello/test/test' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'accept: application/json' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36' -H 'Sec-Fetch-Site: same-origin' -H 'Sec-Fetch-Mode: cors' -H 'Referer: http://localhost:3000/api-docs/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en,ro-RO;q=0.9,ro;q=0.8,en-US;q=0.7,de;q=0.6,fr;q=0.5' --compressed
```

POST example:
```
curl 'http://localhost:3000/api/users' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'accept: application/json' -H 'Origin: http://localhost:3000' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36' -H 'Content-Type: application/json' -H 'Sec-Fetch-Site: same-origin' -H 'Sec-Fetch-Mode: cors' -H 'Referer: http://localhost:3000/api-docs/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en,ro-RO;q=0.9,ro;q=0.8,en-US;q=0.7,de;q=0.6,fr;q=0.5' --data-binary $'{\n  "firstName": "john",\n  "lastName": "smith"\n}' --compressed
```


