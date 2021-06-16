create database sms
use sms

drop database sms

create table UserRole(
RoleId varchar(10) primary key,
RoleName varchar(10)
);


create table Appuser(
userId int IDENTITY(1,1) primary key,
userEmail varchar(50),
userPassword varchar(20),
RoleId varchar(10),
CONSTRAINT userrolee FOREIGN KEY (RoleId) REFERENCES UserRole(RoleId),
);

ALTER TABLE tempUser
ALTER COLUMN tempPassword varchar(500);

select * from tempUser

delete from tempUser

create table tempUser(
tempmail varchar(50),
tempPassword varchar(20)
);


create table Player(
userId integer primary key,
playerFName varchar(20),
playerLName varchar(20),
playerAddress varchar(100),
playerteleNum integer,
playerDOB date,
playerGender varchar(6),
playerWeight int,
playerHeight int,
playerBloodGroup varchar(3),
CONSTRAINT userplayer FOREIGN KEY (userId) REFERENCES Appuser(userId)
);

create table Player_Code(
userId integer,
usercode varchar(20),
CONSTRAINT playerCode FOREIGN KEY (userId) REFERENCES Appuser(userId)
);

select * from Player_Code where userId=149

insert into Player_Code values(67,'ply'+CAST(RAND()*1000000 AS varchar))

update institute set secretNo='ABC'+CAST(RAND()*1000000 AS varchar) where instituteId=12

alter table Player
Add instituteId int

alter table Player
add constraint playerinstitute
foreign key(instituteId) references institute(instituteId)

create table Diseases(
 userId integer primary key,
 playerDiseases varchar(120),
 CONSTRAINT Diseases_fk FOREIGN KEY (userId) REFERENCES Player(userId)
);

create table Achievements(
 playerAchieveId int IDENTITY(1,1) primary key,
 userId integer,
 playerAchievements varchar(120),
 CONSTRAINT Achievements_fk FOREIGN KEY (userId) REFERENCES Player(userId)
);

drop table Achievements

ALTER TABLE Achievements
ADD PRIMARY KEY (playerAchieveId);

ALTER TABLE Achievements
ADD playerAchieveId int IDENTITY(1,1);

select * from Achievements

create table Strengths(
 strengthId int IDENTITY(1,1) primary key,
 userId integer,
 playerStrengths varchar(120),
 CONSTRAINT Strengths_fk FOREIGN KEY (userId) REFERENCES Player(userId)
);


create table Weaknesses(
 weaknessesId int IDENTITY(1,1) primary key,
 userId integer,
 playerWeaknesses varchar(120),
 CONSTRAINT Weaknesses_fk FOREIGN KEY (userId) REFERENCES Player(userId)
);

ALTER TABLE Achievements
ADD PRIMARY KEY (strengthId);

ALTER TABLE Achievements
ADD playerAchieveId int IDENTITY(1,1);

create table ParentType(
typeId varchar(10) primary key,
typeName varchar(10)
);

create table Parent(
userId int primary key,
parentFName varchar(20),
parentLName varchar(20),
parentAddress varchar(100),
ParentteleNum integer,
Parenttype varchar(10),
CONSTRAINT userparent FOREIGN KEY (userId) REFERENCES Appuser(userId)
);

drop table Parent


create table Player_Parent(
parentId integer,
playerId integer,
CONSTRAINT parentPlayer FOREIGN KEY (playerId) REFERENCES Player(userId),
CONSTRAINT playerParent FOREIGN KEY (parentId) REFERENCES Parent(userId)
);

drop table ParentType

create table Coach(
userId integer primary key,
coachFName varchar(20),
coachLName varchar(20),
coachAddress varchar(100),
coachNumber integer,
coachDOB date,
coachGender varchar(6),
instituteId int,
CONSTRAINT usercoach FOREIGN KEY (userId) REFERENCES Appuser(userId),
CONSTRAINT institutecoach FOREIGN KEY (instituteId) REFERENCES institute(instituteId),
);

Alter table Coach
drop constraint usercoach

alter table Coach
Add sportId varchar(10)

alter table Coach
add constraint coachsport
foreign key(sportId) references Sport(sportId)


create table Experiance(
userId integer primary key,
cExperience varchar(500),
CONSTRAINT CoachEx_fk FOREIGN KEY (userId) REFERENCES Coach(userId)
);

create table Qualifications(
userId integer primary key,
cQualifications varchar(500),
CONSTRAINT CoachQuali_fk FOREIGN KEY (userId) REFERENCES Coach(userId)
);

create table Instituteadmin(
userId integer primary key,
adminFName varchar(20),
adminLName varchar(20),
adminAddress varchar(100),
adminTeliNo integer,
adminGender varchar(6),
CONSTRAINT userAdmin FOREIGN KEY (userId) REFERENCES Appuser(userId)
);


create table Sport(
sportId varchar(10) primary key,
sportName varchar(20),
);


create table Sport_Player(
playerId integer,
sportId varchar(10),
CONSTRAINT sportPlayer FOREIGN KEY (playerId) REFERENCES Player(userId),
CONSTRAINT playerSport FOREIGN KEY (sportId) REFERENCES Sport(sportId)
);


create table institute(
instituteId int IDENTITY(1,1) primary key,
instituteName varchar(50),
instituteLocation varchar(50),
userId int,
secretNo varchar(20),
CONSTRAINT adminpf FOREIGN KEY (userId) REFERENCES Instituteadmin(userId)
);

select * 
from institute where instituteId=8

update institute set secretNo='ABC'+CAST(RAND()*1000000 AS varchar) where instituteId=12

create table Sport_Institute(
instituteId int,
sportId varchar(10),
CONSTRAINT sportInstitute FOREIGN KEY (instituteId) REFERENCES institute(instituteId),
CONSTRAINT instituteSport FOREIGN KEY (sportId) REFERENCES Sport(sportId)
);


create table Struture(
strutureId varchar(10) primary key,
strutureName varchar(30),
ageGroup varchar(10),
gender varchar(6)
);

create table Player_Struture(
playerId integer,
strutureId varchar(10),
CONSTRAINT struturePlayer FOREIGN KEY (playerId) REFERENCES Player(userId),
CONSTRAINT playerStruture FOREIGN KEY (strutureId) REFERENCES Struture(strutureId)
);

select * from Player_Struture

update Player_Struture set strutureId='str0001' where playerId=98
--create table SportInstitute_Structure(
--strutureId varchar(12),
--spInstituteId varchar(12),
--totalMatches int,
--wins int,
--losts int,
--CONSTRAINT Sport_Institute_fk FOREIGN KEY (spInstituteId) REFERENCES Sport_Institute(spInstituteId),
--CONSTRAINT structure FOREIGN KEY (strutureId) REFERENCES Struture(strutureId)
--);

create table Team(
teamId int IDENTITY(1,1) primary key,
teamName varchar(20),
strutureId varchar(10),
sportId varchar(10),
coachId integer,
instituteId int,
teamWins int,
teamLoss int,
CONSTRAINT Structure_fk FOREIGN KEY (strutureId) REFERENCES Struture(strutureId),
CONSTRAINT Institute_fk FOREIGN KEY (instituteId) REFERENCES institute(instituteId),
CONSTRAINT Coach_fk FOREIGN KEY (coachId) REFERENCES Coach(userId),
CONSTRAINT Sport_fk FOREIGN KEY (sportId) REFERENCES Sport(sportId)
);

create table Team_Player(
teamId int,
playerId int,
CONSTRAINT teamPlayers_fk FOREIGN KEY (playerId) REFERENCES Player(userId),
CONSTRAINT playerTeam_fk FOREIGN KEY (teamId) REFERENCES Team(teamId)
);


create table Achievements_Team(
 achieveId int IDENTITY(1,1) PRIMARY KEY,
 teamId int,
 teamAchievements varchar(120),
 CONSTRAINT AchievementsTeam_fk FOREIGN KEY (teamId) REFERENCES Team(teamId)
);

ALTER TABLE Achievements_Team
ADD PRIMARY KEY (achieveId);

ALTER TABLE Achievements_Team
ADD achieveId int IDENTITY(1,1);

select * from Achievements_Team

ALTER TABLE Achievements_Team
ADD CONSTRAINT AchievementsTeam_fk FOREIGN KEY (teamId) REFERENCES Team(teamId)


create table Tournament(
tournementId int IDENTITY(1,1) primary key,
tournamentName varchar(30),
sportId varchar(10),
tournamentstatus int,
userId int,
CONSTRAINT sporttour_fk FOREIGN KEY (sportId) REFERENCES Sport(sportId),
CONSTRAINT instituteadmin_fk FOREIGN KEY (userId) REFERENCES Instituteadmin(userId)
);


create table Tournament_Structure(
tournementId int,
strutureId varchar(10),
CONSTRAINT tourstruct_fk FOREIGN KEY (tournementId) REFERENCES Tournament(tournementId),
CONSTRAINT structtour_fk FOREIGN KEY (strutureId) REFERENCES Struture(strutureId),
);

create table Tournament_Institute(
tournementId int,
instituteId int,
CONSTRAINT tourinsti_fk FOREIGN KEY (tournementId) REFERENCES Tournament(tournementId),
CONSTRAINT institour_fk FOREIGN KEY (instituteId) REFERENCES Institute(instituteId),
);

create table Tournament_Team(
tournamentTeamId int IDENTITY(1,1) primary key, 
tournementId int,
teamId int,
instituteId int,
strutureId varchar(10),
CONSTRAINT tourteam_fk FOREIGN KEY (tournementId) REFERENCES Tournament(tournementId),
CONSTRAINT teamtour_fk FOREIGN KEY (teamId) REFERENCES Team(teamId),
CONSTRAINT instiTeam_fk FOREIGN KEY (instituteId) REFERENCES Institute(instituteId),
CONSTRAINT structteam_fk FOREIGN KEY (strutureId) REFERENCES Struture(strutureId)
);


create table Fixture(
fixtureId int IDENTITY(1,1) primary key,
fixtureDate date,
fixtureTime varchar(10),
venue varchar(50),
tournementId int,
strutureId varchar(10),
winTeam int,
fixtureState int,
instituteone varchar(50),
institutetwo varchar(50),
CONSTRAINT tourfixure_fk FOREIGN KEY (tournementId) REFERENCES Tournament(tournementId),
CONSTRAINT structFixture_fk FOREIGN KEY (strutureId) REFERENCES Struture(strutureId),
CONSTRAINT fixturewin_fk FOREIGN KEY (winTeam) REFERENCES Tournament_Team(tournamentTeamId),
);

ALTER TABLE Fixture
ALTER COLUMN venue varchar(50);

select * from Fixture_Team

create table Fixture_Team(
fixtureId int,
tournamentTeamId int,
winLossState Varchar(5),
Points float,
teamScore int,
extras int,
description varchar(1000),
CONSTRAINT fixtureteam_fk FOREIGN KEY (tournamentTeamId) REFERENCES Tournament_Team(tournamentTeamId),
CONSTRAINT teamfixture_fk FOREIGN KEY (fixtureId) REFERENCES Fixture(fixtureId)
);


create table Player_Fixture(
fixtureId int,
playerID int,
playerPoints float,
playerScore int,
tournamentTeamId int,
fixtureAvaial int,
AvaialReason varchar(200),
Confirm int,
PFid int,
overs float,
givescore int,
wickets int,
outnotout varchar(10),
CONSTRAINT playerfixture_fk FOREIGN KEY (fixtureId) REFERENCES Fixture(fixtureId),
CONSTRAINT fixturelayers_fk FOREIGN KEY (playerId) REFERENCES Player(userId),
CONSTRAINT playerTourTeam_fk FOREIGN KEY (tournamentTeamId) REFERENCES Tournament_Team(tournamentTeamId)
);

ALTER TABLE Player_Fixture
ADD PRIMARY KEY (PFid);

ALTER TABLE Player_Fixture
ADD outnotout varchar(10);

select * from Player_Fixture
update Player_Fixture set outnotout= null

select sum(playerScore) as sumScore,Sum(overs) as overs
from Player_Fixture 
where fixtureId=7 AND tournamentTeamId=11

ALTER TABLE Player_Fixture
ADD Confirm int;

select * from Fixture_Team

update Player_Fixture
set Confirm=null

create table Group_Message(
messageId int IDENTITY(1,1) primary key,
messageContent varchar(500),
messageDateTime varchar(30),
teamId int,
userId int,
instituteId int,
userName varchar(30),
RoleId varchar(10),
CONSTRAINT teamMassage_fk FOREIGN KEY (teamId) REFERENCES Team(teamId),
CONSTRAINT userMassage_fk FOREIGN KEY (userId) REFERENCES Appuser(userId),
CONSTRAINT instiMassage_fk FOREIGN KEY (instituteId) REFERENCES institute(instituteId),
CONSTRAINT msgrolee FOREIGN KEY (RoleId) REFERENCES UserRole(RoleId),
);

select * from Group_Message where teamId=1

select * from Group_Message where teamId=@teamId OR teamId=null

insert into Groupmessage values('hi sarath','kamal')

delete from Group_Message

select * from Groupmessage

insert into sampletab1 values(3,'ABC'+CAST(RAND()*1000000 AS varchar))

--create table Request(
--requestId varchar(12) primary key,
--rDate date,
--rTime time,
--playerId varchar(12),
--teamId varchar(12),
--CONSTRAINT RequestPlayer_fk FOREIGN KEY (playerId) REFERENCES Player(playerId),
--CONSTRAINT RequestTeam_fk FOREIGN KEY (teamId) REFERENCES Team(teamId)
--);

//////////////////////////////////////////////////////////////////////////////////////