<p align="center">
  <img src="https://github.com/cs0320-f2022/term-project-aburris3-achavaro-cmoran5-jwilkin7/blob/master/frontend/public/images/logo.png?raw=true" width="500">
<p>

# CS32 Term Project - Sports Watching Scheduler
## Project Overview
Our project, On Deck! aims to solve the problem of sports fan encountering too much information in their daily lives and failing to keep track of all the games they may want to watch. This is a problem that all of us (the project developers) have experienced, as have many of our friends and the potential users we’ve interviewed. Our solution solves this problem by allowing users to input their preferences and get out a definitive schedule of what to watch and when. Our service provides all the information they need for that purpose, and nothing more. The desired information is quickly accessible and easy to understand. Other sports sites, such as ESPN and Bleacher Report, also list out all the active games, but this information is spread out, generally not personalized, and infiltrated with ads, videos, and articles.
<br>
<br>
**Team Members:**
- [Andy Burris](https://github.com/andyburris) - frontend 
- [John Wilkinson](https://github.com/wilkyrlx) - frontend
- [Caleb Moran](https://github.com/cm3cm) - backend
- [Adrien Chavarot](https://github.com/chavarota) - backend

## Design Choices
Currently, the project is only scoped to let users select teams in the NFL, NBA, NHL, or MLB. While we demonstrate how more teams could be added easily, maintaining a large database of these teams to reference requires extra work, and so we decided to provide these teams as a proof of concept. 
<br>
<br>
We decided to store user data in localStorage on the frontend. localStorage is lightweight so OAuth with a database is not necessary, although adding a database may be a nice goal for a future sprint. Furthermore, the data being stored by our application is not particularly sensitive. That being said, we do allow users to opt out so that their data is not stored.

<p align="center">
  <img src="https://github.com/cs0320-f2022/term-project-aburris3-achavaro-cmoran5-jwilkin7/blob/master/frontend/public/images/demo-ss.png?raw=true" width="500">
<p>

## Usage
### Backend - For Users
To run the backend server, one can run the Main() method in Main.java after using <code>mvn package</code>. Alternatively, navigate into the back-end directory and enter the command <code>./run server</code> into a Git Bash terminal. This will start a local server.

### Frontend - For Users
Navigate into the frontend directory and run <code>npm start</code>

### To add more teams - For Devs
To add more teams to the list of teams that are accessible, some work must be accomplished on the frontend. We store records of teams, their logos, and the corresponding league in the allTeams.ts file. This allows for easy lookup by slug (names-that-look-like-this). The steps to add more teams (relatively) easily are
1. Manually make an ESPN API call to https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams where {sport} and {league} are the target 
2. Copy the JSON and put it into input.json in the tools/io directory
3. Run the python script teamJsonGenerator.py in the tools directory
4. Open the output.txt file in the tools/io directory
5. To clean output, use find+replace with following commands:
    1. <"name"> to <name>
    2. <"iconUrl"> to <iconUrl>
    3. <"sport": "Sport.XXX"> to <sport: Sport.XXX>
6. Copy the contents of output.txt, past them into a new const in allTeams.ts
7. Append the new const list to the const allTeams at the bottom
8. Finally, make a corresponding enum in model/Sport.ts

## Testing
Testing for the backend includes:
- Testing public functions and the server responses using JUnit
- Manual inspection of outputted JSON
- Fuzz testing the default endpoint handler
- Mock JSON for an ESPN response to run subsequent requests on

## Credits
A special thank you to our TA mentor David for his guidance. In addition, thank you to Tim for a great semester in CS32.
<br>
Logo generated by [myfreelogomaker](https://myfreelogomaker.com)
