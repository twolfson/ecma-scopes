# ecma-scopes [![Build status](https://travis-ci.org/twolfson/ecma-scopes.png?branch=master)](https://travis-ci.org/twolfson/ecma-scopes)

Listing of block and lexical scope names for [ECMAScript AST][]

We are using the tokens output by [`esprima-fb`][], a fork of [`esprima`][] with ES6 support.

This was created to make detecting scope boundaries easier and well tested. It is a part of the [`esformatter-phonetic`][] project, an [`esformatter`][] plugin that helps with renaming obfuscated variabes to more recognizable ones.

[ECMAScript AST]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
[`esprima-fb`]: https://github.com/facebook/esprima
[`esprima`]: http://esprima.org/
[`esformatter-phonetic`]: https://travis-ci.org/twolfson/esformatter-phonetic
[`esformatter`]: https://github.com/millermedeiros/esformatter

// TODO: Leave a note about how we left `Program` out of lexical scoping becuase it might fit into some but all uses and opting in is easier than opting out.

## Getting Started
Install the module with: `npm install ecma-scopes`

```js
var ecmaScopes = require('ecma-scopes');

```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## Unlicense
As of Nov 04 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
