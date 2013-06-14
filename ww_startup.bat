chdir C:\%HOMEPATH%\WhosWho
START C:\Python27\python.exe C:\%HOMEPATH%\WhosWho\server.py
timeout /t 2
START C:\%HOMEPATH%\AppData\Local\Google\Chrome\Application\chrome.exe http://localhost:8080/static/who.html  --user-data-dir=$(mktemp -d)   --kiosk
