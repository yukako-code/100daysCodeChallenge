export type CacheEntry<V> = { value: V; expiry: number };

export class TTLCache<K, V> {
    private map = new Map<K, CacheEntry<V>>();
    private ttlMs: number;
    constructor(ttlMs: number) {
        this.ttlMs = ttlMs;
    }

    get(key: K): V | undefined {
        const hit = this.map.get(key);
        if (!hit) return undefined;
        if (hit.expiry <= Date.now()) {
            this.map.delete(key);
            return undefined;
        }
        return hit.value;
        /// NOTE: 運用でエントリーが膨らむなら定期クリーンやLRUへ差し替え
    }

    set(key: K, value: V): void {
        this.map.set(key, { value, expiry: Date.now() + this.ttlMs });
    }

    delete(key: K): void {
        this.map.delete(key);
    }

    clear(): void {
        this.map.clear();
    }
}