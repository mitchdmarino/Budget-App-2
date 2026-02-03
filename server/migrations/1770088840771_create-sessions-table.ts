import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("sessions", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    user_id: { type: "uuid", notNull: true, references: "users", onDelete: "CASCADE" },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    expires_at: { type: "timestamptz", notNull: true },
    revoked_at: { type: "timestamptz" },
  });

  pgm.createIndex("sessions", "user_id");
  pgm.createIndex("sessions", "expires_at");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("sessions");
}
