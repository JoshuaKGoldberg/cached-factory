<h1 align="center">cached-factory</h1>

<p align="center">Creates and caches values under keys. 🏭</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 1" src="https://img.shields.io/badge/all_contributors-1-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/cached-factory" target="_blank">
	<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/cached-factory/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/cached-factory/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/cached-factory/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/cached-factory?color=21bb42">
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
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
cache.get("banana") === cached.get("banana");
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

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/cached-factory/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="https://github.com/JoshuaKGoldberg/cached-factory/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).
