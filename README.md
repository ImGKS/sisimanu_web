# Deployment
- Launch Instance
- connect -> SSH (cloud to local terminal)
- chmod 400 "bridge.pem"
	- for window
		- icacls.exe "bridge.pem" /reset
		- icacls.exe "bridge.pem" /grant:r "%USERNAME%:(R)" /inheritance:r
- ssh -i "bridge.pem" ubuntu@ec2-3-109-210-168.ap-south-1.compute.amazonaws.com
- install node with same version as project
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
		- Install nginx
			- sudo apt update
			- sudo apt install nginx
		- start nginx
			- sudo systemctl start nginx
			- sudo systemctl enable nginx
	
	- copy file from dist(build) folder to nginx http server (/var/www/html/)
		- sudo scp -r dist/* /var/www/html/
		
	- By default, aws block all ports.
	- enable port-80
		- instance -> security -> security group -> inbound rules