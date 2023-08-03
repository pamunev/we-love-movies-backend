
exports.up = function(knex) {
  return knex.schema.alterTable("theaters", (table) => {
    table.dropColumn("theater_id");
    table.increments("theater_id").primary();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("theaters", (table) => {
    table.dropColumn("theater_id");
    table.integer("theater_id").primary();
  })
};
