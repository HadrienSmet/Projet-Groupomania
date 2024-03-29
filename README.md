# Projet-Groupomania

## How to get the project from Github

This project is a social network for groupomania
In order to get all the files you need clone the github respository from this link: [GitHub repository](https://github.com/HadrienSmet/Projet-Groupomania.git)
When you are standing on the right directory:

```
git clone https://github.com/HadrienSmet/Projet-Groupomania.git
```

The first line will turn your directory into a github repository
The second line will clone all the directories and all the files from the githbu repository

## How to set the dependencies and how to set the database configuration?

### Front-end

There is a README.md file in the 'front' directory that tells you how to launch the front part of this app.
But before that you will have to follow those steps:
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

Then create a file called '.env' inside the back directory. This file will have to contain four different data that the back requires if you want it to work:

```
ACCESS_TOKEN_SECRET=$<RandomToken>
REFRESH_TOKEN_SECRET=$<RandomToken>
DB_SECRET_NAME=$<AnyNameOfYourChoice>
DB_SECRET_PASSWORD=$<PasswordGeneratedByMongoDB>
DB_SECRET_CLUSTER=$<AnyNameOfYourChoice>
DB_SECRET_URLCODE=<UrlGeneratedByMongoDb>
ADMIN_ACCOUNT_ID=<UserIdGeneratedByMongoDb>
```

The UserIdGeneratedByMongoDb is explained at the line 56 here below.
To generate he RandomToken we advice you to enter those commands into the terminal:

```
node
require('crypto').randomBytes(64).toString('hex')
require('crypto').randomBytes(64).toString('hex')
```

You have now two differents strings to fill the fields.
You can now follow the steps in the README.md inside the back directory :grinning:

## What about the admin account?

You will have to create your own admin account inside your database.
When it is done, you can copy the userId of that account and then you will have to change the code at two different place in the app. As you might have noticed. You already changed the data in the back-end inside your '.env' file. But now you just have to change one thing in the front-end:

### About the front

You will have to create a file called 'adminPassword.js' at the root of the directory called 'utils' wich is in the 'src' directory (not the one in the directory called 'styles'!!!) and writte this line:
`export const adminID = <UserIdGeneratedByMongoDb>;`

I hope you won't have any trouble to launch the app!
Have a nice day! :grinning:
