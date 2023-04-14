# Give roles from CSV bot

This bot was made with the objective to give roles to members based on a `.csv` with member id's and role names (in my case from a Kickstart survey).

# How to use it

> The tutorials written within quotes (this greyish text color with a small bar on the left) are mean't to non devs. If you're a dev you can just ignore the quotes.

## Running the bot in your machine

First of all you need to git clone the project, so `cd` into a folder that you want your project to be and paste:

```bash
git clone https://github.com/luigiMinardi/give-roles-from-csv-discord.git
```

> If you're not familiar with using a terminal you can download the `.zip` from the latest [release](https://github.com/luigiMinardi/give-roles-from-csv-discord/releases).

`cd` into the project folder:

```bash
cd give-roles-from-csv-discord
```

then open the project with your preferred IDE/code editor.

> If you're not familiar with programming in general [Visual Studio Code (VSC)](https://code.visualstudio.com/Download) is a easy to use code editor to run the project.  
> In you file manager (after unzipping) right click the project folder and choose to open with Visual Studio Code.

This project use `node.js` so make sure to have it installed. 

> You can download node.js [here](https://nodejs.org/en) it's recomended to download the LTS version (Long Term Support).

> Within VSC, in the top bar go to `Terminal > New Terminal`. If you can't find it you can also do `Ctrl + Shift + P` and write `Terminal: Create New Terminal`.  
> Now a terminal should have appeared in the bottom part of your VSC window. Inside it write this to check if you node was properly installed:
> ```bash
> node -v
> ```
> If your terminal prompted something e.g `v18.16.0` you're good to go.

Install the dependencies:

```bash
npm i
```

Now to continue you should have your bot app configurated in discord, and your `.env` file done. I show you how [bellow](#creating-discord-application).

## Starting the bot

The first thing you need to do, if it's the first time running the bot, is to upload the slash commands to discord with this command:

> On the same VSC terminal that you ran `node -v` and `npm i` you'll run this commands.  
```bash
node deploy-commands.js
```

After doing it one time you can just start the bot with:  
```bash
node .
```

You're now good to go. To see witch slash commands and how we expect the csv data to be click [here](#bot-commands).  

# Creating discord application

Navigate to the [Discord Developers website](https://discord.com/developers/applications) go to `New Application` add a name and `Create`.

Inside the project we have a file named `.env.example`, duplicate the file and rename it to `.env`.

Inside your created app on discord go to `General Information > APPLICATION ID` and copy your id.

In the `.env` file add the id after the `=` on `APP_ID`.

Your `.env` should be looking like this right now:

```bash
DISCORD_TOKEN=
APP_ID=12345678910111213
```

Now back to your discord app go to `Bot > Build-A-Bot > Add Bot` choose `Yes, do it!` if you have 2FA you'll need to pass there.  
*If you named your discord app with a common name you may need yo change it in `General Information > Name`. After renaming return to the `Bot` section and try to create it again.*  

Now with your bot in the `Bot` section you need to go to `TOKEN` and copy it. Return to the `.env` file and put the token afeter the `=` on `DISCORD_TOKEN` and between  Apostrophe (`'`).  

Your `.env` should be looking like this right now:

```bash
DISCORD_TOKEN='MASD23asdf12ABTGHsasd.ACBe54Y.2aS-BQasdvghrf23VESDRH_asc125'
APP_ID=12345678910111213
```

Now for the bot to be able to manage the members you need to go, still on the `Bot` section to `Privileged Gateway Intents > SERVER MEMBERS INTENT` and toggle it on.

To add the bot to your server go to the section `OAuth2 > URL Generator`.

In the `SCOPES` select `bot` and `applications.commands` and to fasten the configurations in the `BOT PERMISSIONS` select `Administrator` under `GENERAL PERMISSIONS`.

Scroll down, copy the `GENERATED URL` and paste in your broser. Then select the server you want the bot to be into.

Now with the bot configurated is time to [run it](#starting-the-bot)

# WARNING

This project on the current version (v0.1.0) is not made to work on many servers at the same time. You shouldn't try to run the `csv` commands in different servers since the data from the `server B` will replace the ones of the `server A`.  
You can run the commands on `server B` after finishing the ones on `server A` without problems though.  

# Bot Commands

### `/give-csv-roles`

__Warning__ When you run this command, for it to work properly you should already have runned the other three commands (`/kickstarter-data`, `/members-csv` and `/roles-csv`).  

This command reads all the data from the three csv's provided and give the roles based on it.

### `/kickstarter-data`

This command expects a `.csv` file to be uploaded. The file should have `tag` and `role` as their `headers`.

The `role` should be the name of a role, and it will need to match the `/roles-csv` role name.

The `tag` should be the discord member tag, and it will need to match the `/members-csv` member.

Example `.csv`:

```bash
tag, role
Member#1234, Helper
User#4321, Supporter
Foo#0000, Benefactor
Bar#1111, Sponsor
```

### `/members-csv`

This command generate a `.csv` file with all your server members and their id's.  

Example `.csv`:

```bash
member,id 
Member#1234,965531542014232727
User#4321,602212582097926363
Foo#0000,106317433655198693
Bar#1111,499764085572040631
```

### `/roles-csv`

This command expects a `.csv` to be uploaded. The file should have `name` and `id` as their `headers`.

The `name` should be the name of a role, and it will need to match the `/kickstarter-data` role.

the `id` should be the role ID that you can right click and copy on the role you wan't to be given.

```bash
name,id 
Helper, 843592548587281102 
Supporter, 541560300675159897
Benefactor, 960115887144875830
Sponsor, 471381805903639522
```

