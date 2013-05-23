#!/usr/local/bin/python
import web as webpy
import sqlite3 as lite
import string
import sys

a_con = lite.connect('who.db', check_same_thread = False)
a_con.row_factory = lite.Row #dictionary for results
cur = a_con.cursor()
imgurl="IMG/PEOPLE/"
urls = (
    '/Name/(.*)', 'namelist',
	'/Bio/(.*)', 'bio_id'
)

class namelist:
    def POST(self, name):
		webpy.header('Access-Control-Allow-Origin',      '*')
		webpy.header('Access-Control-Allow-Credentials', 'true')
		print(name)
		nameq = name+"%"
		print(nameq)
		list = "<ul id='names'>"
		with a_con:
			cur.execute("SELECT * FROM WhosWho WHERE Last like ?",[nameq])
			rows = cur.fetchall()
			for row in rows:
				print row;
			#	list += "<h1>%s %s %s</h1>" % (row["First"],row["Middle"],row["Last"])
				list += "<li><a href='#%s' >%s %s %s</a></li>" % (row['id'],row['First'],row['Middle'],row['Last'])
			list += "</ul>"
		return list

class bio_id:
    def POST(self, _id):
		webpy.header('Access-Control-Allow-Origin',      '*')
		webpy.header('Access-Control-Allow-Credentials', 'true')
		readable = webpy.input().readable
		print("ID arg ", readable)
		bio = ""
		with a_con:
			cur.execute("SELECT * FROM WhosWho WHERE id = ?",[_id])
			row = cur.fetchone()
			img = row["Photo"]
			print "ROWPHOTO = "+img
			bio+="<div class = 'half left'><img class = 'headshot' src ='%s%s' /></div>" % (imgurl,img)
			bio+="<div class = 'half right'><div id ='bio'><h1>%s, %s %s</h1><h1>(%s-%s)</h1><p>%s</p></div>" % (row["Last"],row["First"],row["Middle"],row["Birth"],row["Death"],row["Body1"])
			
			#	bio+="</div>"
			bio+=  "<ol id ='bioPage'><li id ='biop' class = '' dir = '-1' >&#8592prev</li><li>&#9674</li><li id ='bion' class = 'active' dir = '1'>next&#8594</li><li id = 'zoom'>Z</li></ol></div>"
		
		
		
		return bio
		

if __name__ == "__main__":
    app = webpy.application(urls, globals())
    app.run()
