
alter proc register
@userEmail varchar(50),
@RoleId varchar(10)
as
begin

	declare @userPassword varchar(200)
	select @userPassword=tempPassword 
	from tempUser
	where tempmail=@userEmail

	insert into Appuser values(@userEmail,@userPassword,@RoleId)

	delete from tempUser
	where tempmail=@userEmail
end


alter proc tempregister
@userEmail varchar(50),
@userPassword varchar(200)
as
begin
	insert into tempUser(tempmail,tempPassword)
	values(@userEmail,@userPassword)
end


alter proc getinstituteid
@userEmail varchar(50),
@Exist int out
as
begin
	declare @ui int
	declare @RoleId varchar(10)
	select @ui=userId,@RoleId=RoleId
	from Appuser
	where userEmail=@userEmail

	if(@RoleId='ur0001')
	begin
		select @Exist=instituteId
		from institute
		where userId=@ui
	end
	else if(@RoleId='ur0002')
	begin
		select @Exist=instituteId
		from Player
		where userId=@ui
	end
	else if(@RoleId='ur0004')
	begin
		select @Exist=instituteId
		from Coach
		where userId=@ui
	end
end

alter proc getplayerid
@userEmail varchar(50),
@Exist int out,
@ui int out
as
begin
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	select @Exist=instituteId
	from Player
	where userId=@ui
end

declare @ans1 int
declare @ans2 int
exec getplayerid 'hhhh@h.arrree',@ans1 out,@ans2 out
print @ans1
print @ans2

alter proc proccheckuser
@userEmail varchar(50),
@userPassword varchar(20),
@Exist int out
as
begin
	IF Exists( Select userEmail,userPassword From Appuser Where userEmail=@userEmail AND userPassword=@userPassword)    
	Begin  
		   Set @Exist = 1   
	End    
	Else     
	Begin  
		   Set @Exist=0  
	end  
end

create proc userlogin
@userEmail varchar(50),
@userPassword varchar(20),
@Exist int out
as
begin
	IF Exists( Select userEmail,userPassword From Appuser Where userEmail=@userEmail AND userPassword=@userPassword)    
	Begin  
		   Set @Exist = 1   
	End    
	Else     
	Begin  
		   Set @Exist=0  
	end  
end


declare @exit int
execute proccheckuser 'madushankasupun@gmail.com','aaaaaaaa',@exit out
print @exit

create proc proccheckuseremail
@userEmail varchar(50),
@Exist int out
as
begin
	IF Exists( Select userEmail,userPassword From Appuser Where userEmail=@userEmail)    
	Begin  
		   Set @Exist = 1   
	End    
	Else     
	Begin  
		   Set @Exist=0  
	end  
end

create proc setUserType
@userEmail varchar(50),
@RoleId varchar(10)
as
begin
	update Appuser
	set RoleId=@RoleId
	where userEmail=@userEmail
end

exec setUserType 'a@a.com','ur0001'


alter proc playerregister
@userEmail varchar(50),
@playerFName varchar(20),
@playerLName varchar(20),
@playerAddress varchar(100),
@playerteleNum integer,
@playerDOB date,
@playerGender varchar(6),
@instituteId int,
@strutureId varchar(10)
as
begin
	declare @userID varchar(50)
	select @userID=userId from Appuser where userEmail=@userEmail

	insert into Player(userID,playerFName,playerLName,playerAddress,playerteleNum,playerDOB,playerGender,instituteId)
	values(@userID,@playerFName,@playerLName,@playerAddress,@playerteleNum,@playerDOB,@playerGender,@instituteId)

	insert into Player_Struture
	values(@userID,@strutureId)

	insert into Player_Code values(@userID,'ply'+CAST(RAND()*1000000 AS varchar))
end

exec playerregister 'myname@gmail.com','supun','madushanka','tangall',0705630771,'2020-01-12','gender'


alter proc Parentregister
@userEmail varchar(50),
@ParentFName varchar(20),
@ParentLName varchar(20),
@typeId varchar(10),
@ParentteleNum integer,
@ParentAddress varchar(100)
as
begin
	declare @userID int
	select @userID=userId from Appuser where userEmail=@userEmail

	insert into Parent(userID,ParentFName,ParentLName,ParentAddress,ParentteleNum,Parenttype)
	values(@userID,@ParentFName,@ParentLName,@ParentAddress,@ParentteleNum,@typeId)
end


alter proc adiminregister
@userEmail varchar(50),
@adminFName varchar(20),
@adminLName varchar(20),
@adminAddress varchar(100),
@adminTeliNo integer,
@adminGender varchar(6),
@instituteName varchar(50),
@instituteLocation varchar(50)
as
begin
	declare @userID varchar(50)
	select @userID=userId from Appuser where userEmail=@userEmail

	insert into Instituteadmin(userID,adminFName,adminLName,adminAddress,adminTeliNo,adminGender)
	values(@userID,@adminFName,@adminLName,@adminAddress,@adminTeliNo,@adminGender)

	insert into institute(instituteName,instituteLocation,userId,secretNo)
	values(@instituteName,@instituteLocation,@userID,'ABC'+CAST(RAND()*1000000 AS varchar))
end

select userId from Appuser where userEmail='madushankasupun@gmail.com'

create proc instituteregister
@instituteName varchar(50),
@instituteLocation varchar(50),
@userId int
as
begin
	insert into institute(instituteName,instituteLocation,userId)
	values(@instituteName,@instituteLocation,@userID)
end

alter proc teamregister
@userEmail varchar(50),
@teamName varchar(20),
@strutureId varchar(10),
@sportId varchar(10),
@coachId integer
as
begin
	declare @ui int
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	select @instituteId=instituteId
	from institute
	where userId=@ui

	insert into Team(teamName,strutureId,sportId,coachId,instituteId)
	values(@teamName,@strutureId,@sportId,@coachId,@instituteId)

	insert into Sport_Institute
	values(@instituteId,@sportId)
end

create proc editteam
@teamid integer,
@teamName varchar(20),
@coachId integer
as
begin
	if(@teamName is not null AND @teamName!='')
	begin
	update Team set teamName=@teamName where teamid=@teamid
	end

	if(@coachId is not null AND @coachId!='')
	begin
	update Team set coachId=@coachId where teamid=@teamid
	end
end

select * from Team where teamId=1

alter proc coachregister
@userEmail varchar(50),
@coachFName varchar(20),
@coachLName varchar(20),
@coachAddress varchar(100),
@coachNumber integer,
@coachGender varchar(6),
@coachDOB date,
@coachEmail varchar(50),
@userPassword varchar(500),
@sportId varchar(10)
as
begin
	declare @ui int
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	select @instituteId=instituteId
	from institute
	where userId=@ui

	insert into Appuser(userEmail,userPassword,RoleId)
	values(@coachEmail,@userPassword,'ur0004')

	declare @coachId int
	select @coachId=userId
	from Appuser
	where userEmail=@coachEmail

	insert into Coach(userId,coachFName,coachLName,coachAddress,coachNumber,coachDOB,coachGender,instituteId,sportId)
	values(@coachId,@coachFName,@coachLName,@coachAddress,@coachNumber,@coachDOB,@coachGender,@instituteId,@sportId)
end

alter proc createplayer
@userEmail varchar(50),
@playerFName varchar(20),
@playerLName varchar(20),
@playerAddress varchar(100),
@playerteleNum integer,
@playerGender varchar(6),
@playerDOB date,
@playerEmail varchar(50),
@userPassword varchar(500),
@strutureId varchar(10)
as
begin
	declare @ui int
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	select @instituteId=instituteId
	from institute
	where userId=@ui

	insert into Appuser(userEmail,userPassword,RoleId)
	values(@playerEmail,@userPassword,'ur0002')

	declare @playerId int
	select @playerId=userId
	from Appuser
	where userEmail=@playerEmail


	insert into Player(userId,playerFName,playerLName,playerAddress,playerteleNum,playerDOB,playerGender,playerWeight,playerHeight,playerBloodGroup,instituteId)
	values(@playerId,@playerFName,@playerLName,@playerAddress,@playerteleNum,@playerDOB,@playerGender,0,0,0,@instituteId)

	insert into Player_Struture
	values(@playerId,@strutureId)

	insert into Player_Code values(@playerId,'ply'+CAST(RAND()*1000000 AS varchar))
end

select * from Player
select * from Appuser

create proc Addachieve
@teamId int,
@teamAchievements varchar(120)
as
begin
	insert into Achievements_Team
	values(@teamId,@teamAchievements)
end

create proc deleteachieve
@achieveId int
as
begin
	delete from Achievements_Team where achieveId=@achieveId
end

create proc addparentplayer
@userId int,
@usercode varchar(20)
as
begin
	declare @playerId int
	select @playerId=userId
	from Player_Code
	where usercode=@usercode

	insert into Player_Parent
	values(@userId,@playerId)
end

select * from Team

execute Addachieve 1, 'Tournement 2 semi finalice'

alter proc getStructureId
@teamId int,
@strutureId varchar(10) out,
@instituteId int out
as
begin
	select @strutureId=strutureId,@instituteId=instituteId
	from Team
	where teamId=@teamId
end

declare @struct varchar(10)
execute getStructureId 1,@struct out
print @struct

create proc addplayerteam
@teamId int,
@playerId int
as
begin
	insert into Team_Player
	values(@teamId,@playerId)
end

execute addplayerteam 1,68

delete from Team_Player where playerId is null

select * from Team_Player
select * from Player

create proc removeplayerteam
@teamId int,
@playerId int
as
begin
	delete from Team_Player where playerId = @playerId AND teamId=@teamId
end

alter proc createtournament
@userEmail varchar(50),
@tournamentName varchar(100),
@sportId varchar(10),
@under15male varchar(5),
@under15female varchar(5),
@under17male varchar(5),
@under17female varchar(5),
@under19male varchar(5),
@under19female varchar(5)
as
begin

	declare @ui int
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	select @instituteId=instituteId
	from institute
	where userId=@ui

	insert into Tournament
	values(@tournamentName,@sportId,null,@ui)

	declare @maxid int
	SELECT @maxid=tournementId
	FROM Tournament
	where tournamentName=@tournamentName

	insert into Tournament_Institute
	values(@maxid,@instituteId)

	if(@under15male='true')
	begin
		declare @teamId1 int
		select @teamId1=teamId from Team where strutureId='str0001' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0001')
		insert into Tournament_Team values(@maxid,@teamId1,@instituteId,'str0001')
	end
	if(@under15female='true')
	begin
		declare @teamId2 int
		select @teamId2=teamId from Team where strutureId='str0002' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0002')
		insert into Tournament_Team values(@maxid,@teamId2,@instituteId,'str0002')
	end
	if(@under17male='true')
	begin
		declare @teamId3 int
		select @teamId3=teamId from Team where strutureId='str0003' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0003')
		insert into Tournament_Team values(@maxid,@teamId3,@instituteId,'str0003')
	end
	if(@under17female='true')
	begin
		declare @teamId4 int
		select @teamId4=teamId from Team where strutureId='str0004' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0004')
		insert into Tournament_Team values(@maxid,@teamId4,@instituteId,'str0004')
	end
	if(@under19male='true')
	begin
		declare @teamId5 int
		select @teamId5=teamId from Team where strutureId='str0005' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0005')
		insert into Tournament_Team values(@maxid,@teamId5,@instituteId,'str0005')
	end
	if(@under19female='true')
	begin
		declare @teamId6 int
		select @teamId6=teamId from Team where strutureId='str0006' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Structure values(@maxid,'str0006')
		insert into Tournament_Team values(@maxid,@teamId6,@instituteId,'str0006')
	end
end


create proc starttournement
@tournementId int
as
begin
	update Tournament
	set tournamentstatus=1
	where tournementId=@tournementId 
end

create proc postponetournament
@tournementId int
as
begin
	update Tournament
	set tournamentstatus=null
	where tournementId=@tournementId 
end

create proc finishtournament
@tournementId int
as
begin
	update Tournament
	set tournamentstatus=0
	where tournementId=@tournementId 
end

create proc updatedescript
@description varchar(1000),
@fixtureId int,
@tournamentTeamId int
as
begin
	update Fixture_Team
	set description=@description
	where tournamentTeamId=@tournamentTeamId AND fixtureId=@fixtureId
end


alter proc registerfixture
@fixtureDate date,
@fixtureTime time,
@venue varchar(20),
@tournementId int,
@strutureId varchar(10),
@firstTournamentTeamId int,
@secondTournamentTeamId int
as
begin
	declare @instituteone varchar(50)
	select @instituteone=i.instituteName
	from Tournament_Team tt,Institute i
	where tournamentTeamId=@firstTournamentTeamId AND tt.instituteId=i.instituteId

	declare @institutetwo varchar(50)
	select @institutetwo=i.instituteName
	from Tournament_Team tt,Institute i
	where tournamentTeamId=@secondTournamentTeamId AND tt.instituteId=i.instituteId

	declare @fixtureId int
	insert into Fixture
	values(@fixtureDate,@fixtureTime,@venue,@tournementId,@strutureId,null,null,@instituteone,@institutetwo)
	set @fixtureId=SCOPE_IDENTITY()

	insert into Fixture_Team
	values(@fixtureId,@firstTournamentTeamId,null,0,0,0,null)

	insert into Fixture_Team
	values(@fixtureId,@secondTournamentTeamId,null,0,0,0,null)
end

alter proc editfixture
@fixtureDate date,
@fixtureTime time,
@venue varchar(50),
@fixtureId int
as
begin
	if(@fixtureDate is not null AND @fixtureDate!='' AND @fixtureDate!='2000-01-01T00:00:00.000Z')
	begin
	update Fixture set fixtureDate=@fixtureDate where fixtureId=@fixtureId
	end

	if(@fixtureTime is not null AND @fixtureTime!='')
	begin
	update Fixture set fixtureTime=@fixtureTime where fixtureId=@fixtureId
	end
	
	if(@venue is not null AND @venue!='')
	begin
	update Fixture set venue=@venue where fixtureId=@fixtureId
	end
end

alter proc getFixtureTeam
@userEmail varchar(50),
@fixtureId int,
@teamId int out,
@tournamentTeamId int out
as
begin

	declare @ui int
	declare @RoleId varchar(10)
	select @ui=userId,@RoleId=RoleId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	if(@RoleId='ur0001')
	begin
		select @instituteId=instituteId
		from institute
		where userId=@ui
	end
	else if(@RoleId='ur0002')
	begin
		select @instituteId=instituteId
		from Player
		where userId=@ui
	end
	else if(@RoleId='ur0004')
	begin
		select @instituteId=instituteId
		from Coach
		where userId=@ui
	end

	select @tournamentTeamId=ft.tournamentTeamId
	from Fixture_Team ft,Tournament_Team tt
	where ft.tournamentTeamId=tt.tournamentTeamId AND fixtureId=@fixtureId AND instituteId=@instituteId

	select @teamId=teamId
	from Tournament_Team
	where tournamentTeamId=@tournamentTeamId
end

create proc addeextra
@fixtureId int,
@extras int,
@tournamentTeamId int
as
begin
	update Fixture_Team set extras=@extras where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId
end

create proc startfixture
@fixtureId int
as
begin
	update Fixture set fixtureState=1 where fixtureId=@fixtureId
end

create proc postponefixture
@fixtureId int
as
begin
	update Fixture set fixtureState=null where fixtureId=@fixtureId
end

create proc deletefixture
@fixtureId int
as
begin
	delete from Fixture_Team where fixtureId=@fixtureId
	delete from Player_Fixture where fixtureId=@fixtureId
	delete from Fixture where fixtureId=@fixtureId
end

alter proc finishfixture
@fixtureId int,
@wonteam int,
@wonscore int,
@lossteam int,
@lossscore int
as
begin
	update Fixture set fixtureState=0,winTeam=@wonteam where fixtureId=@fixtureId

	update Fixture_Team set Points=5,teamScore=@wonscore,winLossState='win' where tournamentTeamId=@wonteam AND fixtureId=@fixtureId

	update Fixture_Team set Points=0,teamScore=@lossscore,winLossState='loss' where tournamentTeamId=@lossteam AND fixtureId=@fixtureId
end

alter proc addplayerscore
@fixtureId int,
@playerID int,
@playerScore int,
@overs float,
@givescore int,
@wickets int,
@outnotout varchar(10),
@tournamentTeamId int
as
begin
	if(@playerScore is not null AND @playerScore!='')
	begin
	update Player_Fixture 
	set playerScore=@playerScore
	where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND playerID=@playerID
	end

	if(@overs is not null AND @overs!='')
	begin
	update Player_Fixture 
	set overs=@overs
	where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND playerID=@playerID
	end

	if(@givescore is not null AND @givescore!='')
	begin
	update Player_Fixture 
	set givescore=@givescore
	where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND playerID=@playerID
	end

	if(@wickets is not null AND @wickets!='')
	begin
	update Player_Fixture 
	set wickets=@wickets
	where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND playerID=@playerID
	end

	if(@outnotout is not null AND @outnotout!='')
	begin
	update Player_Fixture 
	set outnotout=@outnotout
	where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND playerID=@playerID
	end
end

select * from Player

Alter proc updateplayer
@userId integer,
@playerFName varchar(20),
@playerLName varchar(20),
@playerAddress varchar(100),
@playerteleNum integer,
@playerWeight int,
@playerHeight int,
@playerBloodGroup varchar(3)
as
begin
	if(@playerFName is not null)
	begin
		update Player set playerFName=@playerFName where userId=@userId
	end

	if(@playerLName is not null)
	begin
		update Player set playerLName=@playerLName where userId=@userId
	end

	if(@playerAddress is not null)
	begin
		update Player set playerAddress=@playerAddress where userId=@userId
	end

	if(@playerteleNum is not null)
	begin
		update Player set playerteleNum=@playerteleNum where userId=@userId
	end

	if(@playerWeight is not null AND @playerWeight!='')
	begin
		update Player set playerWeight=@playerWeight where userId=@userId
	end

	if(@playerHeight is not null AND @playerHeight!='')
	begin
		update Player set playerHeight=@playerHeight where userId=@userId
	end

	if(@playerBloodGroup is not null AND @playerBloodGroup!='')
	begin
		update Player set playerBloodGroup=@playerBloodGroup where userId=@userId
	end
end

alter proc changePassword
@userId int,
@userPassword varchar(500)
as
begin
	update Appuser set userPassword=@userPassword where userId=@userId
end

create proc AddPlayerAchieve
@userId int,
@playerAchievements varchar(120)
as
begin
	insert into Achievements
	Values(@userId,@playerAchievements)
end

create proc deleteplayerachieve
@playerAchieveId int
as
begin
	delete from Achievements where playerAchieveId=@playerAchieveId
end

create proc AddPlayerStrength
@userId int,
@playerStrengths varchar(120)
as
begin
	insert into Strengths
	Values(@userId,@playerStrengths)
end

create proc deleteplayerstrength
@strengthId int
as
begin
	delete from Strengths where strengthId=@strengthId
end

create proc AddPlayerWeakness
@userId int,
@playerWeaknesses varchar(120)
as
begin
	insert into Weaknesses
	Values(@userId,@playerWeaknesses)
end

create proc deleteplayerweakness
@weaknessesId int
as
begin
	delete from Weaknesses where weaknessesId=@weaknessesId
end

alter proc updatecoach
@userId integer,
@coachFName varchar(20),
@coachLName varchar(20),
@coachAddress varchar(100),
@coachNumber integer
as
begin
	if(@coachFName is not null AND @coachFName!='')
	begin
		update Coach set coachFName=@coachFName where userId=@userId
	end

	if(@coachLName is not null AND @coachLName!='')
	begin
		update Coach set coachLName=@coachLName where userId=@userId
	end

	if(@coachAddress is not null AND @coachAddress!='')
	begin
		update Coach set coachAddress=@coachAddress where userId=@userId
	end

	if(@coachNumber is not null AND @coachNumber!='')
	begin
		update Coach set coachNumber=@coachNumber where userId=@userId
	end
end

create proc updateparent
@userId integer,
@parentFName varchar(20),
@parentLName varchar(20),
@parentAddress varchar(100),
@ParentteleNum integer
as
begin
	if(@parentFName is not null AND @parentFName!='')
	begin
		update Parent set parentFName=@parentFName where userId=@userId
	end

	if(@parentLName is not null AND @parentLName!='')
	begin
		update Parent set parentLName=@parentLName where userId=@userId
	end

	if(@parentAddress is not null AND @parentAddress!='')
	begin
		update Parent set parentAddress=@parentAddress where userId=@userId
	end

	if(@ParentteleNum is not null AND @ParentteleNum!='')
	begin
		update Parent set ParentteleNum=@ParentteleNum where userId=@userId
	end
end

alter proc jointour
@userEmail varchar(50),
@tournementId int
as
begin
	declare @ui int
	select @ui=userId
	from Appuser
	where userEmail=@userEmail

	declare @instituteId int
	select @instituteId=instituteId
	from institute
	where userId=@ui
	
	insert into Tournament_Institute
	Values(@tournementId,@instituteId)

	declare @sportId varchar(10)
	select @sportId=sportId
	from Tournament
	where tournementId=@tournementId

	if exists(select * from Tournament_Structure where strutureId = 'str0001' AND tournementId=@tournementId)
	begin
		declare @teamId1 int
		select @teamId1=teamId from Team where strutureId='str0001' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId1,@instituteId,'str0001')
	end
	if exists(select * from Tournament_Structure where strutureId = 'str0002' AND tournementId=@tournementId)
	begin
		declare @teamId2 int
		select @teamId2=teamId from Team where strutureId='str0002' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId2,@instituteId,'str0002')
	end
	if exists(select * from Tournament_Structure where strutureId = 'str0003' AND tournementId=@tournementId)
	begin
		declare @teamId3 int
		select @teamId3=teamId from Team where strutureId='str0003' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId3,@instituteId,'str0003')
	end
	if exists(select * from Tournament_Structure where strutureId = 'str0004' AND tournementId=@tournementId)
	begin
		declare @teamId4 int
		select @teamId4=teamId from Team where strutureId='str0004' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId4,@instituteId,'str0004')
	end
	if exists(select * from Tournament_Structure where strutureId = 'str0005' AND tournementId=@tournementId)
	begin
		declare @teamId5 int
		select @teamId5=teamId from Team where strutureId='str0005' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId5,@instituteId,'str0005')
	end
	if exists(select * from Tournament_Structure where strutureId = 'str0006' AND tournementId=@tournementId)
	begin
		declare @teamId6 int
		select @teamId6=teamId from Team where strutureId='str0006' AND instituteId=@instituteId AND sportId=@sportId

		insert into Tournament_Team values(@tournementId,@teamId6,@instituteId,'str0006')
	end
end

create proc changeavailability
@fixtureId int,
@playerID int,
@tournamentTeamId int,
@AvaialReason varchar(200)
as
begin
	update Player_Fixture
	set fixtureAvaial=0,AvaialReason=@AvaialReason
	where playerID=@playerID AND fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId
end

create proc confirmavailability
@fixtureId int,
@playerID int,
@tournamentTeamId int
as
begin
	update Player_Fixture
	set Confirm=1
	where playerID=@playerID AND fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId
end

alter proc savemessage
@messageContent varchar(500),
@messageDateTime varchar(30),
@teamId int,
@userId int,
@userName varchar(30),
@RoleId varchar(10)
as
begin
	declare @instituteId int
	if(@RoleId='ur0001')
	begin
		select @instituteId=instituteId
		from institute
		where userId=@userId
	end
	else if(@RoleId='ur0002')
	begin
		select @instituteId=instituteId
		from Player
		where userId=@userId
	end
	else if(@RoleId='ur0004')
	begin
		select @instituteId=instituteId
		from Coach
		where userId=@userId
	end

	insert into Group_Message
	values(@messageContent,@messageDateTime,@teamId,@userId,@instituteId,@userName,@RoleId)
end


///////////////////////////////////////////////////////////////////////////////////////////////////

create view teamPlayer
as
select * 
from Team_Player tp,player p
where tp.playerId=p.userId

alter view getcoachview
as
select c.userId,c.coachFName,c.coachLName,s.sportName,c.coachNumber,c.instituteId
from Coach c,Sport s,Team t
where c.sportId=s.sportId
group by c.coachFName,c.coachLName,s.sportName,c.coachNumber,c.instituteId,c.userId

create view getcoachview1
as
select g.userId,g.coachFName,g.coachLName,g.sportName,g.coachNumber,COUNT(t.teamId) as teams,g.instituteId
from getcoachview g
LEFT JOIN Team t
on g.userId=t.coachId
group by g.userId,g.coachFName,g.coachLName,g.sportName,g.coachNumber,g.instituteId

select * from Coach
select * from Sport
select * from Team_Player

select *
from getcoachview1

alter view getteamview
as
select t.teamId,t.teamName,c.coachFName,c.coachLName,s.sportName,st.strutureName,COunt(tp.playerId) as Players,t.instituteId,t.teamWins,t.teamLoss
from Team t,Coach c,Sport s,Struture st,Team_Player tp
where t.coachId=c.userId And t.sportId=s.sportId And t.strutureId=st.strutureId
group by t.teamId,c.coachFName,c.coachLName,s.sportName,st.strutureName,t.instituteId,t.teamName,t.teamWins,t.teamLoss

alter view getteamview1
as
select t.teamId,t.teamName,t.coachFName,t.coachLName,t.sportName,t.strutureName,COunt(tp.playerId) as Players,t.instituteId,t.teamWins,t.teamLoss
from getteamview t
LEFT JOIN Team_Player tp
on t.teamId=tp.teamId
group by t.teamId,t.teamName,t.coachFName,t.coachLName,t.sportName,t.strutureName,t.instituteId,t.teamWins,t.teamLoss

alter view playerview
as
select p.userId,p.playerFName,p.playerLName,p.playerAddress,p.playerteleNum,p.playerDOB,p.playerGender,COUNT(tp.playerId) as teams,p.instituteId
from Player p
Left Join Team_Player tp
on p.userId=tp.playerId
group by p.userId,p.playerFName,p.playerLName,p.playerAddress,p.playerteleNum,p.playerDOB,p.playerGender,p.instituteId

alter view notteamview
as
select *
from Player p
Left Join Team_Player tp
on P.userId = tp.playerId

alter view addplayerview
as
select nt.userId,nt.playerFname,nt.playerLName,nt.playerAddress,nt.playerteleNum,nt.playerDOB,nt.playerGender,nt.teamId,ps.strutureId,nt.instituteId
from notteamview nt,Player_Struture ps
where nt.userId = ps.playerId

select * 
from addplayerview a 
where a.strutureId='str0001' AND not exists 
(select * from Team_Player tp where teamId=1 AND a.userId=tp.playerId)

select * 
from addplayerview a
where strutureId='str0002' AND teamId!=2 AND instituteId=8 AND 
not exists
(select * from Team_Player tp where teamId=2 AND a.userId=tp.playerId)

alter view fixtureteamview
as
select f.fixtureId,ft.tournamentTeamId,f.fixtureDate,f.fixtureTime,f.venue,f.tournementId,f.strutureId,f.fixtureState,f.winTeam,ft.winLossState,ft.Points,ft.teamScore,ft.extras,ft.description
from Fixture_Team ft
Left Join Fixture f
on ft.fixtureId=f.fixtureId

alter view fixturesummery
as
select ft.fixtureId,ft.tournamentTeamId,ft.fixtureDate,ft.fixtureTime,ft.venue,ft.tournementId,ft.strutureId,ft.fixtureState,ft.winTeam,ft.winLossState,ft.Points,ft.teamScore,ft.extras,ft.description,st.strutureName,i.instituteName,t.teamName
from fixtureteamview ft,Tournament_Team tt,Struture st,Institute i,Team t
where ft.tournamentTeamId=tt.tournamentTeamId AND ft.strutureId=st.strutureId AND tt.instituteId=i.instituteId AND t.teamId=tt.teamId

create view tournamentsummery
as
select i.instituteId,tt.tournementId,count(tt.teamId) as teamCount,sum(ft.Points) as point,i.instituteName
from Tournament_Institute ti,institute i,Tournament_Team tt,Fixture_Team ft
where ti.instituteId=i.instituteId AND ti.instituteId=tt.instituteId AND ft.tournamentTeamId=tt.tournamentTeamId
group by i.instituteId,tt.tournementId,i.instituteName

select i.instituteId,tt.tournementId,count(tt.teamId) as teamCount,sum(ft.Points) as point,i.instituteName
from Tournament_Institute ti,institute i,Tournament_Team tt,Fixture_Team ft
where ti.instituteId=i.instituteId AND ti.instituteId=tt.instituteId AND ft.tournamentTeamId=tt.tournamentTeamId
group by i.instituteId,tt.tournementId,i.instituteName

select i.instituteId,tt.tournementId,count(tt.teamId) as teamCount,sum(ft.Points) as point,i.instituteName
from Fixture_Team ft,Tournament_Team tt,institute i
where ft.tournamentTeamId=tt.tournamentTeamId AND tournementId=5 AND tt.instituteId=i.instituteId
group by i.instituteId,tt.tournementId,i.instituteName

alter view playersteam
as
select tp.playerId,t.teamId,t.teamName,c.coachFName,c.coachLName,s.sportName,st.strutureName,t.instituteId,t.teamWins,t.teamLoss
from Team_Player tp,Team t,Sport s,Struture st,Coach c
where tp.teamId=t.teamId AND s.sportId=t.sportId AND st.strutureId=t.strutureId AND c.userId=t.coachId

select * 
from Player_Parent pp,Parent p
where pp.parentId=p.userId AND pp.playerId=67

///////////////////////////////////////////////////////////////////////////////////////////////////////

select * 
from Team_Player tp,Team t,Sport s
where tp.teamId=t.teamId and t.instituteId=8 and tp.playerId=56 and t.sportId=s.sportId

select *
from Player p, Team_Player tp
where p.userId = tp.playerId and tp.teamId=1

select *
from getteamview1 g, institute i
where g.instituteId=i.instituteId and g.teamId=1

select * 
from getteamview1 g, institute i 
where g.instituteId=i.instituteId and g.teamId=1

select *
from Achievements_Team
where teamId=1

select * 
from Player p,Player_Struture ps
where p.userId = ps.playerId And ps.strutureId='str0001'

select *
from Tournament t, Sport s
where t.tournementId=1 AND t.sportId=s.sportId

select *
from Tournament_Team tt,Team t,Institute i,Struture s
where t.teamId=tt.teamId AND tt.instituteId=i.instituteId AND tournementId=3 ANd tt.strutureId=s.strutureId

select count(tt.teamId) as teamWins
from Fixture_Team ft,Tournament_Team tt
where ft.tournamentTeamId=tt.tournamentTeamId AND teamId=1 AND winLossState='loss'


select *
from Tournament t,Sport s
where not exists(
	select *
	from Tournament_Institute ti
	where instituteId=12 AND ti.tournementId=t.tournementId
) AND t.sportId=s.sportId


select * 
from Player_Fixture pf,Fixture f,Tournament t
where pf.fixtureId=f.fixtureId AND PlayerId=67 AND fixtureState is null AND t.tournementId=f.tournementId

select * 
from Player_Parent pp, Player P
where pp.playerId=p.userId AND parentId=134


select *
from Player_Fixture

select * 
from Player_Fixture pf,Tournament_Team tt,Player p 
where pf.tournamentTeamId=tt.tournamentTeamId AND p.userId=pf.playerId AND tt.tournamentTeamId=11 AND pf.fixtureId=7


select * 
from Player_Fixture pf,Fixture f,Tournament t 
where pf.fixtureId=f.fixtureId AND PlayerId=67 AND fixtureState is null AND t.tournementId=f.tournementId

select * 
from Player_Fixture pf,Tournament_Team tt,Player p 
where pf.tournamentTeamId=tt.tournamentTeamId AND p.userId=pf.playerId AND pf.fixtureId=8


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

create trigger winlossteam
on Fixture_Team 
after insert,update
as
begin

	declare @tournamentTeamId int
	select @tournamentTeamId=tournamentTeamId
	from inserted

	declare @teamId int
	select @teamId=teamId
	from Tournament_Team
	where tournamentTeamId=@tournamentTeamId

	declare @totalWins int
	select @totalWins=count(tt.teamId)
	from Fixture_Team ft,Tournament_Team tt
	where ft.tournamentTeamId=tt.tournamentTeamId AND teamId=@teamId AND winLossState='win'

	declare @totalLoss int
	select @totalLoss=count(tt.teamId)
	from Fixture_Team ft,Tournament_Team tt
	where ft.tournamentTeamId=tt.tournamentTeamId AND teamId=@teamId AND winLossState='loss'

	update Team
	set teamWins=@totalWins
	where teamId=@teamId

	update Team
	set teamLoss=@totalLoss
	where teamId=@teamId
end


