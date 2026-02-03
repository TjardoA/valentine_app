// In-memory store; persists only for server lifetime.
const store = new Map();

export function saveInvite(id, payload) {
  store.set(id, payload);
}

export function getInvite(id) {
  return store.get(id);
}

export function markYes(id) {
  const item = store.get(id);
  if (!item) return null;
  item.answeredAt = new Date();
  return item;
}
