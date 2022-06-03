# Chitti---Discord-bot

## Introduction

Welcome your new Discord companion, Chitti! 

This comes with automated responses out of the box with no prior hosting or setup required. Just add / invite to your server and your ready to go.

---
## Setup

Use the below OAuth Link to authenticate and add Chitti to your server.

Chitti OAuth Link: [Here](https://discord.com/api/oauth2/authorize?client_id=980021368517165076&permissions=0&scope=bot)

This adds an instance of Chitti with no pre-existing permissions or roles. 

Roles and permissions may be added manually at the discretion of the server administrator.
As of Chitti v2.0.1 there are no required permissions or roles.

---
## Customization

Chitti can be easily tailored to indivdual server needs. 
Just fork the repository and setup/run in your prefered hosting service.

Chitti is preconfigured to work with Heroku's free Dyno service. Setup is as follows:
1. Fork the repository
2. Create [Heroku Free Dyno](https://dashboard.heroku.com/new-app)
3. Configure dyno formation to be worker node bot.js 
            
       worker node src/bot.js
<img src = "https://github.com/Gagan1729-droid/Chitti---Discord-bot/blob/master/assets/worker.PNG">

4. Setup GitHub Deployment Method. </br>
  -Connect your forked repository as the deployment method. Automatic deployment from your repostiory is optional, but useful feature. 
  
<img src = "https://github.com/Gagan1729-droid/Chitti---Discord-bot/blob/master/assets/github.PNG">

5. Make changes to your repository to suit your indivdual servers needs. Update/Merge with Chitti---Discord-bot's master branch as needed.

---

## Contact me

Connect with me on [discord](www.discordapp.com/users/775777502420402230)

Do suggest changes and feature updates on Github through
 - [Pull Requests](https://github.com/Gagan1729-droid/Chitti---Discord-bot/pulls)
 - [Issues](https://github.com/Gagan1729-droid/Chitti---Discord-bot/issues)
