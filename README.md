# Deployment
- Launch Instance
- connect -> SSH (cloud to local terminal)
- chmod 400 "bridge.pem"
	- for window
		- icacls.exe "bridge.pem" /reset
		- icacls.exe "bridge.pem" /grant:r "%USERNAME%:(R)" /inheritance:r
- get the public IP address - 52.66.251.209
- ssh -i <pemp-file-name>.pem ubuntu@<IP4 address>
	- ssh -i sisimanu.pem ubuntu@52.66.251.209
	- ssh -i "bridge.pem" ubuntu@ec2-3-109-210-168.ap-south-1.compute.amazonaws.com
- install node with same version as project
	- sudo apt update
	- sudo apt upgrade -y
	- curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
	- sudo apt install -y nodejs
- clone project
	- FE
	- BE

- Deploy FE
	- How we run in local? - npm run dev
	- In prod. - we make build first
		- npm run build
		- it create a dist folder
		- we will deploy dist folder
	
	- Inside FE folder
		- npm i 
		- npm run build
		- ls -> dist folder
		
	- To deploy FE project, we need
		- nginx - engine X
		- Install nginx - can do from inside FE folder
			- sudo apt update
			- sudo apt install nginx
		- start nginx
			- sudo systemctl start nginx
			- sudo systemctl enable nginx
	
	- copy file from dist(build) folder to nginx http server (/var/www/html/)
		- sudo scp -r dist/* /var/www/html/
		
	- By default, aws block all ports.
	- enable port-80
		- instance -> security -> security group -> inbound rules -> edit inbound rules

- pmp file - key to access the server

- Backend
	- use SSH CMD to access the m/c
	- clone the backend project
	- npm i 
	- npm run start/npm start - in prod
	- allow machine to access mongo db database - allow Server IP (Public IP) address
	- Enable to backend port in aws
		- Custome TCP - 7777
	- In this way, it only work till the terminal is open.
	- need to keep server running
	- PM2 (keep application running 24X7)
	- npm i pm2 -g inside backend folder in server
	- pm2 start npm -- start
	- pm2 logs
	- pm2 flush <name of application/>
	
	- change name 
		- pm2 list
		- pm2 stop <name of application/>
		- pm2 delete <name of application/>
		- pm2 start npm --name "sisimanu-backend" -- start 
		
- Frontend - http://3.109.210.168/
- Backend - http://3.109.210.168:7777

- Domain name - sisimanu.com => 3.109.210.168

- Frontend - sisimanu.com
- Backend - sisimanu.com/7777 -> sisimanu.com/api (using nginx proxy pass)

- Config nginx
	- sudo nano(edit file) /etc/nginx/sites-available/default -> redirect to nginx file
	- edit | add in the nginx config 
		- server name - IP|domain name
		- location /api/ {
				proxy_pass http://localhost:7777/; # Pass the request to the Node.js app
				proxy_http_version 1.1;
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection "upgrade";
				proxy_set_header Host $host;
				proxy_cache_bypass $http_upgrade;
			}
		- check nginx config status
			- sudo nginx -t
	- restart nginx 
		- sudo systemctl restart nginx
	
- Modify the base frontend url 
	- Base URL - "/api"
	- push the code
	
- take pull in server
- build the new code
- copy this to /var/www/html folder
	- sudo scp -r dist/* /var/www/html