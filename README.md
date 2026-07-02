# Deployment
- Launch Instance
- connect -> SSH (cloud to local terminal)
- in cmd, get path to download
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

<!-- Domain name -->
- purchase the domain
- cloudflare
	- signup & add new domain
	- get the nameserver from cloudfare
	- change the nameserver in godaddy
	- update the A record in cloudflare
	- For SSL/TSL
		- SSL/TLS
		- Custom -> Flexible
		- Edge certificate
			- Automatic HTTPS

- .env
	- sudo nano .env
	- copy env data
	- save file
	- restart pm2

<!-- ------------------------------------------------------------------------------------------ -->
- node-cron
	- CRONTAB GURU - website to visualize cron time
	- date-fns - npm package to deal with date and days
	- bee-queue - To handle large data in queue
	- bullMQ npm for queue

<!-- --------------------------------------------------------------------------- -->
- ssh -i bridge.pem ubuntu@13.201.36.182

<!-- Create Memory in EC2 to make build -->
- sudo fallocate -l 2G /swapfile
- sudo chmod 600 /swapfile
- sudo mkswap /swapfile
- sudo swapon /swapfile

<!-- Check the Memory -->
- free -h

- npm run build

<!-- Remove the extra Memory -->
- sudo swapoff /swapfile
- sudo rm /swapfile
- free -h
- swapon --show

<!-- ---------------------------------------------------------------------------------------------------------------------- -->
- JTI (JWT ID) - Unique ID
	- unique identifier for every JWT token.
	- we add jti in payload of token.
	- server doesn't remember which tokens exist.
	- User login, someone steals Access token. Even if the real user logs out, The stolen token is still valid until expiration.
	- Solution - every token gets its own identity.
	- Block Individual token.
	- Use Case
		- 1. Logout - Mark jti revoked.
		- 2. Block stolen token - Specific jti revoked.
		- 3. Allow only 3 devices - Each device gets its own jti.
		- 4. Refresh Token Rotation - Old refresh token's jti becomes invalid.
		- 5. Admin force logout - Admin can revoke all active jtis for a user.
		- 6. Detect suspicious activity - If the same jti suddenly appears from different countries or IP addresses at the same time, you can flag or revoke it.
		- 7. Store JTI with refresh token and use it with access token.

	- A secure JWT authentication system should use short-lived access tokens (10–15 minutes) and long-lived refresh tokens (around 30 days). When a user logs in, the server generates both tokens and assigns a unique JTI (JWT ID) to the refresh token. Instead of storing the refresh token itself, the server stores its hash, along with the JTI, user ID, device information, and refresh token in the database. The access token is returned to the client and used to access protected APIs, while the refresh token is stored in an HttpOnly, Secure cookie so it cannot be accessed by JavaScript.

	For normal API requests, the server only verifies the access token's signature and expiration, avoiding any database lookup for better performance. When the access token expires, the client calls the refresh endpoint, automatically sending the refresh token via the HttpOnly cookie. The server verifies the refresh token, extracts its JTI, validates the corresponding refresh toekn in the database, and then issues a new access token and a new refresh token with a new JTI (refresh token rotation) and update in the db. On logout, the server revokes or deletes the refreshh token and jti record associated with that JTI and clears the refresh token cookie, preventing any future token refreshes.
