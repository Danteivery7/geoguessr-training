import type { AssetRecord } from "../types";

const databaseName = "geomastery-assets";
const storeName = "assets";

const openDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const saveAssetBlob = async (id: string, blob: Blob) => {
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put({ id, blob });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
};

export const loadAssetBlob = async (id: string) => {
  const database = await openDatabase();
  const record = await new Promise<{ id: string; blob: Blob } | undefined>((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return record?.blob;
};

export const assetMetadataKey = (profileId: string) => `geomastery:assets:${profileId}`;

export const exportAssetMetadata = (assets: AssetRecord[]) =>
  JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      assets,
      note: "Blob uploads live in this browser's IndexedDB. Reattach files after importing on another device.",
    },
    null,
    2
  );
