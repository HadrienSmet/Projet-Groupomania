# Projet-Groupomania

## How to get the project from Github 
This project is a social network for groupomania
In order to get all the files you need clone the github respository from this link: [GitHub repository](https://github.com/HadrienSmet/Projet-Groupomania.git)
When you are standing on the right directory:

```
git init
git clone https://github.com/HadrienSmet/Projet-Groupomania.git
```

The first line will turn your directory into a github repository
The second line will clone all the directories and all the files from the githbu repository
## What about the rest
### Front-end
There is a README.md file in the 'front' directory that tells you how to launch the front part of this app.
When you are standing on the directory called 'front' make this command in your terminal:

```
npm install
```

Now you can follow the steps in the README.md inside the front directory :grinning:

### Back-end
There is a README.md file in the 'back' directory that tells you how to launch the back part of this app
But first the are a few steps to install everything we need
When you are standing on the directory called 'back' make this command in your terminal:

```
npm install
```

Then create a file called '.env' inside the back directory. This file will have to contain four different data the the back requires to work:

```
ACCESS_TOKEN_SECRET=$<RandomToken>
REFRESH_TOKEN_SECRET=$<RandomToken>
ADMIN_SECRET_NAME=$<AnyNameOfYourChoice>
ADMIN_SECRET_PASSWORD=$<PasswordGeneratedByMongoDB>
```

To generate he RandomToken we advice you to enter those commands into the terminal:

```
node
require('crypto').randomBytes(64).toString('hex')
require('crypto').randomBytes(64).toString('hex')
```

You have now two differents strings to fill fields
You can now follow the steps in the README.md inside the back directory :grinning:
