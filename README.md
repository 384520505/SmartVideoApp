# SmartVideoApp

# study to commit a project on github for MacOS
1.brew install git
2.If we use git tools of first time,need to do
	git config --global user.name "384520505"
	git config --global user.email 384520505@qq.com
3.To create a ssh key,the spet is very important and we need to setting a passward,than we must be remember the passward
	ssh-keygen -t rsa -C "384520505@qq.com"
To ecamine the sceret key
	cd .ssh
	cat id_rsa.pub
4.Copy the sceret key
5.Log in your account in github,click the "header image",select the "setting" option,than select "SSH and GPG SCERET KEY" to create new ssh key and paste the sceret key 
6.To look over the connects in terminal
	ssh -T git@github.com
7.We need may be to fill in "yes/no",we fill in 'yes',and we need fill in passward,to fill in the passward of we remember the passward in the front
8.To create a github repository in github
9.To run some command
	git init
	git add .
	git commit -m "XXXX"
10.To copy SSH link in github
11.git remote add origin SSH link
12.git push -u origin master
That's all.
	
# introduct
This project is about EZVIZ monitoring App
The ezuikit.js plugins are used in the project

# who to start
1.software:Hbuilder
2.git clone this project
3.
