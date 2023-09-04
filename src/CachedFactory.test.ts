import { describe, expect, it, vi } from "vitest";

import { CachedFactory } from "./index.js";

describe("CachedFactory", () => {
	it("creates a new value under a key when the value doesn't yet exist", () => {
		const value = "value-first";
		const getter = vi.fn().mockReturnValue(value);
		const cachedFactory = new CachedFactory(getter);

		const actual = cachedFactory.get("key-first");

		expect(actual).toEqual(value);
	});

	it("reuses an existing value under a key when the value doesn't yet exist", () => {
		const value = "value-first";
		const getter = vi.fn().mockReturnValueOnce(value).mockReturnValue("second");
		const cachedFactory = new CachedFactory(getter);

		const actual = cachedFactory.get("key-first");

		expect(actual).toEqual(value);
	});

	it("caches a values under provided keys when a key is repeated", () => {
		const getter = vi.fn().mockImplementation((key: string) => key);
		const cachedFactory = new CachedFactory(getter);

		expect(cachedFactory.get("key-first")).toEqual("key-first");
		expect(cachedFactory.get("key-first")).toEqual("key-first");

		expect(getter.mock.calls).toEqual([["key-first"]]);
	});

	it("caches values under provided keys when multiple keys are used", () => {
		const getter = vi.fn().mockImplementation((key: string) => key);
		const cachedFactory = new CachedFactory(getter);

		expect(cachedFactory.get("key-first")).toEqual("key-first");
		expect(cachedFactory.get("key-second")).toEqual("key-second");
		expect(cachedFactory.get("key-first")).toEqual("key-first");
		expect(cachedFactory.get("key-second")).toEqual("key-second");
		expect(cachedFactory.get("key-second")).toEqual("key-second");
		expect(cachedFactory.get("key-first")).toEqual("key-first");
		expect(cachedFactory.get("key-first")).toEqual("key-first");

		expect(getter.mock.calls).toEqual([["key-first"], ["key-second"]]);
	});

	it("clears the cache when .clear is executed", () => {
		const getter = vi.fn().mockImplementation((key: string) => Symbol(key));
		const cachedFactory = new CachedFactory(getter);

		const initialValue = cachedFactory.get("key");
		expect(cachedFactory.get("key")).toEqual(initialValue);

		cachedFactory.clear();

		const nextValue = cachedFactory.get("key");
		expect(cachedFactory.get("key")).toEqual(nextValue);
		expect(cachedFactory.get("key")).not.toEqual(initialValue);
	});
});
