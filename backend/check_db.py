import pymysql
import json

conn = pymysql.connect(host='localhost', user='root', password='1234', database='school', cursorclass=pymysql.cursors.DictCursor)
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
