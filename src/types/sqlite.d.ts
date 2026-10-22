// biome-ignore-all lint: sqlite-types
declare module "node:sqlite" {
  export interface RunResult {
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }

  export class StatementSync {
    all<T = unknown>(...params: unknown[]): T[];
    get<T = unknown>(...params: unknown[]): T | undefined;
    run(...params: unknown[]): RunResult;
  }

  export class DatabaseSync {
    constructor(location: string, options?: { open?: boolean });
    close(): void;
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
  }
}
