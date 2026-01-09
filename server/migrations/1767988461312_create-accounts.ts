import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createExtension("pgcrypto", { ifNotExists: true });

    pgm.createTable("accounts", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        user_id: {
            type: "uuid", 
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        }, 

        name: {
            type: "varchar(255)", 
            notNull: true, 
        }, 
    }); 

    pgm.addConstraint("accounts", "accounts_user_id_name_unique", {
        unique: ["user_id", "name"],
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("accounts");
}
