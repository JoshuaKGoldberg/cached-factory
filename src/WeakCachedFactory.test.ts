import { describe, expect, it, vi } from "vitest";

import { WeakCachedFactory } from "./WeakCachedFactory.ts";

describe("WeakCachedFactory", () => {
	it("creates a new value under a key when the value doesn't yet exist", () => {
		const value = "value-first";
		const getter = vi.fn().mockReturnValue(value);
		const cachedFactory = new WeakCachedFactory(getter);

		const actual = cachedFactory.get({ key: "first" });

		expect(actual).toEqual(value);
	});

	it("reuses an existing value under a key when the value doesn't yet exist", () => {
		const value = "value-first";
		const getter = vi.fn().mockReturnValueOnce(value).mockReturnValue("second");
		const cachedFactory = new WeakCachedFactory(getter);

		const actual = cachedFactory.get({ key: "first" });

		expect(actual).toEqual(value);
	});

	it("caches a values under provided keys when a key is repeated", () => {
		const getter = vi.fn().mockImplementation((key: string) => key);
		const cachedFactory = new WeakCachedFactory(getter);

		const key = { key: "first" };
		expect(cachedFactory.get(key)).toEqual(key);
		expect(cachedFactory.get(key)).toEqual(key);

		expect(getter.mock.calls).toEqual([[key]]);
	});

	it("caches values under provided keys when multiple keys are used", () => {
		const getter = vi.fn().mockImplementation((key: string) => key);
		const cachedFactory = new WeakCachedFactory(getter);

		const keyFirst = { key: "first" };
		const keySecond = { key: "second" };
		expect(cachedFactory.get(keyFirst)).toEqual(keyFirst);
		expect(cachedFactory.get(keySecond)).toEqual(keySecond);
		expect(cachedFactory.get(keyFirst)).toEqual(keyFirst);
		expect(cachedFactory.get(keySecond)).toEqual(keySecond);
		expect(cachedFactory.get(keySecond)).toEqual(keySecond);
		expect(cachedFactory.get(keyFirst)).toEqual(keyFirst);
		expect(cachedFactory.get(keyFirst)).toEqual(keyFirst);

		expect(getter.mock.calls).toEqual([[keyFirst], [keySecond]]);
	});

	it("creates a new value under a key when .get() is used after .clear()", () => {
		const secondValue = "second";
		const getter = vi
			.fn()
			.mockReturnValueOnce("first")
			.mockReturnValueOnce(secondValue);

		const cachedFactory = new WeakCachedFactory(getter);

		const key = { key: "key" };
		cachedFactory.get(key);
		cachedFactory.clear();

		const second = cachedFactory.get(key);
		expect(second).toEqual(secondValue);
	});
});
