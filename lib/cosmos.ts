import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT!;
const key = process.env.COSMOS_KEY!;
const databaseId = process.env.COSMOS_DB_NAME!;
const containerId = process.env.COSMOS_CONTAINER_NAME!;

export function getCosmosContainer() {
  if (!endpoint || !key || !databaseId || !containerId) {
    throw new Error("Missing Cosmos environment variables.");
  }
  const client = new CosmosClient({ endpoint, key });
  return client.database(databaseId).container(containerId);
}
