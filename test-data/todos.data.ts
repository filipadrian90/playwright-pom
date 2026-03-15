export const TODO_ITEMS = [
  "Buy groceries",
  "Write Playwright tests",
  "Ship to production",
] as const;

export type TodoItem = (typeof TODO_ITEMS)[number];

export const uniqueTodo = (prefix = "Todo"): string =>
  `${prefix} — ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
