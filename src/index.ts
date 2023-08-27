export type Factory<Key, Value> = (key: Key) => Value;

export class CachedFactory<Key, Value> {
	#cache = new Map<Key, Value>();
	#getter: Factory<Key, Value>;

	constructor(factory: Factory<Key, Value>) {
		this.#getter = factory;
	}

	clear() {
		this.#cache.clear();
	}

	get(key: Key) {
		const existing = this.#cache.get(key);
		if (existing) {
			return existing;
		}

		const value = this.#getter(key);
		this.#cache.set(key, value);
		return value;
	}
}
