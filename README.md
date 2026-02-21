<h1 align="center">cached-factory</h1>

<p align="center">
	Creates and caches values under keys.
	🏭
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 2" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-2-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/cached-factory/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/cached-factory" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/cached-factory?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/cached-factory/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/cached-factory" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/cached-factory?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

`cached-factory` exports a `CachedFactory` class that takes in "factory" function in its constructor.
Each time a factory's `.get(key)` is called with any `key` for the first time, that factory is used to create a value under the `key`.

```ts
const cache = new CachedFactory((key) => `Cached: ${key}!`);

// "Cached: apple!"
cache.get("apple");
```

Values are cached so that subsequent `.get(key)` calls with the same `key` instantly return the same value.

```ts
const cache = new CachedFactory((key) => ({ key }));

// { key: "banana" }
cache.get("banana");

// true
cache.get("banana") === cache.get("banana");
```

### Asynchronous Factories

`CachedFactory` does not itself handle `Promise` logic, but it doesn't have to!
Provided factory functions can themselves be `async` / return `Promise` values.

```ts
const cache = new CachedFactory(
	async (key) => await fetch(`/some/resource?key=${key}`),
);

// Type: Promise<Response>
cache.get("cherry");

// Type: Response
await cache.get("cherry");
```

### Other Methods

#### `clear`

Clears the cache.

```ts
cache.clear();
```

### TypeScript

`CachedFactory` is written in TypeScript and ships with strong typing. 💪

> 👉 Tip: if you're working with [`noImplicitAny`](https://aka.ms/tsconfig#noImplicitAny) enabled _(which is generally a good idea)_, an inline function provided as an argument to `CachedFactory` may need an explicit type annotation for its key.
>
> ```ts
> new CachedFactory((key: string) => `Cached: ${key}!`);
> ```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 🏭

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://lishaduck.github.io"><img src="https://avatars.githubusercontent.com/u/88557639?v=4?s=100" width="100px;" alt="Eli"/><br /><sub><b>Eli</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/cached-factory/issues?q=author%3Alishaduck" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/cached-factory/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/cached-factory/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
