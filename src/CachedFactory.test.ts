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

	it("creates a new value under a key when .get() is used after .clear()", () => {
		const secondValue = "second";
		const getter = vi
			.fn()
			.mockReturnValueOnce("first")
			.mockReturnValueOnce(secondValue);

		const cachedFactory = new CachedFactory(getter);

		cachedFactory.get("key");
		cachedFactory.clear();

		const second = cachedFactory.get("key");
		expect(second).toEqual(secondValue);
	});
});
