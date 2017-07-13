# jquery-parallel-ajax

This is a jquery plugin which make jquery ajax calls concurrently. The responses return from ajax callback will be cached into a 'fakeArray' which is accessbale through a callback function after all the ajax request return, Or an error callback will be called if any of ajax fail.

`note: the ajax option.success and option.error will be override, please use success parament and error parament`

## Paraments
| paramName     | type          | comment  |
| ------------- |:-------------:| -----:|
| options       | array         | an array of jQuery ajax option, option.success and option.error will be override      |
| success       | function(resArray)   | success callback   |
| error         | function(error)      | error callback     |
| timeout       | number               | timeout in ms (3000ms by default)     |

## Usage

- be sure that the jquery is loaded
- npm i jquery-parallel-ajax
- $.parallelAjax(options, success, error, 3000);

## Simple
HTML
```html
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="./js/jquery.min.js"></script>
    <script src="./dist/bundle.js"></script>

    <script>
        $.parallelAjax([
            {url: 'https://api.github.com/'},
            {url: 'https://api.github.com/'},
        ], function(response) {
            console.info('success', response);
        }, function(error) {
            console.info('error', error);
        });
    </script>
</head>
<body>
</body>
</html>
```