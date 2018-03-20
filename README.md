# request-mockup-json

## Usage

### Create mockup files

All mockup files need be ```.json```.

Your path is ```[JSON files path]/[Method]/[URL].json```

| JSON files path | Method | URL | Path |
|--|--|--|--|
| ~/mockups/ | GET | /test/ | ~/mockups/GET/test.json |
| ~/mockups/ | POST | /test/verify/ | ~/mockups/POST/test/verify.json |

#### File example:

```
[
    {
        "data": {},
        "response": {
            "code": 200,
            "content": "OK",
            ...others
        }
    }
]
```

### Get response
```
var requestMockupJson = require('request-mockup-json');

// Create method function
var get = requestMockupJson.create(
    'GET', // Method
    'mockups' // JSON files Path
);
var response = get('/test/');

// or use generic method
var response = requestMockupJson.getResponse(
    'GET',
    '/test/',
    {}, // Data
    {}, // Extra config
    'mockups' // JSON files Path
);


// Get status code and content
var status_code = response.code;
var content = response.content;
console.log(status_code, content);
```