import pymysql

passwords = ['1234', '', 'root']
db_names = ['school', 'heritage_db']

for p in passwords:
    for db in db_names:
        try:
            conn = pymysql.connect(host='localhost', user='root', password=p, database=db)
            cur = conn.cursor()
            cur.execute("DELETE FROM content WHERE section='gallery' AND (title='xcvbnm' OR title LIKE '%xcvbnm%' OR image_path LIKE '%004be27e%')")
            
            # Check gallery count
            cur.execute("SELECT COUNT(*) FROM content WHERE section='gallery'")
            cnt = cur.fetchone()[0]
            print(f"Connected to {db} with pass '{p}'. Current gallery rows: {cnt}")
            
            # If empty or only bad rows were there, insert proper 4 gallery cards
            if cnt == 0:
                gallery_items = [
                    ('gallery', 'Annual Valedictory & Commencement Convocation', 'TRADITIONS', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop', 1),
                    ('gallery', 'Morning Crew & Athletics Fellowship', 'ATHLETICS', 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop', 2),
                    ('gallery', 'Symphony Rehearsal & Brass Ensemble', 'PERFORMING ARTS', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop', 3),
                    ('gallery', 'Genomics & Applied Chemistry Laboratory', 'INNOVATION', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop', 4)
                ]
                for sec, title, cat, img, order in gallery_items:
                    cur.execute("INSERT INTO content (section, title, subtitle, image_path, display_order) VALUES (%s, %s, %s, %s, %s)", (sec, title, cat, img, order))
                print("Inserted 4 default gallery items into database!")
            
            conn.commit()
            conn.close()
        except Exception as e:
            # print(f"Failed {db} with '{p}': {e}")
            pass
