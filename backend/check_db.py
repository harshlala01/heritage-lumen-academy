from app import get_db

conn = get_db()
cur = conn.cursor()

print("=== GALLERY ALBUMS ===")
cur.execute("SELECT * FROM gallery_albums")
for r in cur.fetchall():
    print(r)

print("\n=== GALLERY ITEMS ===")
cur.execute("SELECT * FROM gallery_items")
for r in cur.fetchall():
    print(r)

print("\n=== CONTENT TABLE (GALLERY) ===")
cur.execute("SELECT * FROM content WHERE section='gallery'")
for r in cur.fetchall():
    print(r)

conn.close()
