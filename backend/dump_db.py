import app
import json
import os

conn = app.get_db()
cur = conn.cursor()

sql_lines = [
    "-- -------------------------------------------------------------",
    "-- The Rabindra Bharati Heritage Day School Database Dump",
    "-- Compatible with any database name (e.g. 'school' or 'heritage_db')",
    "-- Generated for 1-Click Import into phpMyAdmin / MySQL CLI",
    "-- -------------------------------------------------------------\n",
    "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';",
    "START TRANSACTION;",
    "SET time_zone = '+00:00';",
    "SET FOREIGN_KEY_CHECKS = 0;\n"
]

cur.execute("SHOW TABLES")
tables = [list(r.values())[0] for r in cur.fetchall()]

for tbl in tables:
    sql_lines.append("-- -------------------------------------------------------------")
    sql_lines.append(f"-- Table structure for table `{tbl}`")
    sql_lines.append("-- -------------------------------------------------------------")
    sql_lines.append(f"DROP TABLE IF EXISTS `{tbl}`;")
    
    cur.execute(f"SHOW CREATE TABLE `{tbl}`")
    create_stmt = list(cur.fetchone().values())[1] + ";"
    sql_lines.append(create_stmt + "\n")
    
    cur.execute(f"SELECT * FROM `{tbl}`")
    rows = cur.fetchall()
    if rows:
        sql_lines.append(f"-- Dumping data for table `{tbl}`")
        for r in rows:
            cols = ", ".join([f"`{k}`" for k in r.keys()])
            vals = []
            for v in r.values():
                if v is None:
                    vals.append("NULL")
                elif isinstance(v, (int, float)):
                    vals.append(str(v))
                elif isinstance(v, (dict, list)):
                    s = json.dumps(v, ensure_ascii=False)
                    s_esc = s.replace("\\", "\\\\").replace("'", "''")
                    vals.append(f"'{s_esc}'")
                else:
                    s = str(v)
                    s_esc = s.replace("\\", "\\\\").replace("'", "''")
                    vals.append(f"'{s_esc}'")
            val_str = ", ".join(vals)
            sql_lines.append(f"INSERT INTO `{tbl}` ({cols}) VALUES ({val_str});")
        sql_lines.append("")

sql_lines.append("SET FOREIGN_KEY_CHECKS = 1;")
sql_lines.append("COMMIT;\n")

full_sql = "\n".join(sql_lines)

# Write to backend/heritage_db.sql and project root heritage_db.sql
backend_path = os.path.join(os.path.dirname(__file__), "heritage_db.sql")
root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "heritage_db.sql"))

with open(backend_path, "w", encoding="utf-8") as f:
    f.write(full_sql)

with open(root_path, "w", encoding="utf-8") as f:
    f.write(full_sql)

print(f"✅ Successfully updated SQL dump files (universal database compatibility):")
print(f"   -> {backend_path}")
print(f"   -> {root_path}")
print(f"Total lines: {len(sql_lines)}")
cur.close()
conn.close()
