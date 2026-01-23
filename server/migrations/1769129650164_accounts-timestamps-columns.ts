import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumns("accounts", {
        created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("now()"),
        },
        updated_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("now()"),
        },
    }); 
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumns("accounts", ["created_at", "updated_at"]);
}
