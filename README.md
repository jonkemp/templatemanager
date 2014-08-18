# TemplateManager

> Load and cache external templates with jQuery and Underscore. Returns a promise.

Useful for JavaScript MVC frameworks, such as Backbone.js.

### Requirements

* jQuery
* Underscore.js

## Usage

```js
// Create an instance
var templateManager = new TemplateManager();

// Add templates to the cache
templateManager.template('templates/hello.html');
templateManager.template('templates/world.html');

// Compile templates and use with promises
templateManager.template('templates/hello.html')
    .done(function (template) {
        template({ name: 'Fred' });
    });
```
To see an example of this, check out the [wizard-mvc project](https://github.com/jonkemp/wizard-mvc/tree/master/public/backbone).

## License 

The MIT License

Copyright (c) 2014, Jonathan Kemp
