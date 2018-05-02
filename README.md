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
        "query_string": {},  // Optional
        "headers": {},  // Optional
        "data": {},  // Optional
        "response": {
            "status": 200,
            "content": "OK",
            ...others
        }
    }
]
```

### Functions

#### .getResponse()

```requestMockupJson.create(method, path, data, config);```

#### .create()

```requestMockupJson.create(method, config);```

### Config dict

| Param | Type | Default | Description |
|--|--|--|--|
| mockupsPath | string | __basedir | Path to mockup files |
| validateStatus | function | ```check the code``` | ```function (status) {}``` returns true to valid status and false to invalid status |
| headers | dictionary | undefined | Request headers |

## Examples

### GET

```
var requestMockupJson = require('request-mockup-json');

// Create method function
var get = requestMockupJson.create(
    'GET', // Method
    { // config dict
        mockupsPath: 'mockups' // JSON files Path
    }
);
var response = get('/test/');

// or use generic method
var response = requestMockupJson.getResponse(
    'GET',
    '/test/',
    {}, // Data
    { // config dict
        mockupsPath: 'mockups' // JSON files Path
    }
);


// Get status code and content
var status_code = response.status;
var content = response.content;
console.log(status_code, content);
```