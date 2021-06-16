select * from Appuser where userEmail='supunmadushanka19980822@gmail.com'
select * from tempUser
select * from Player
select * from Parent
select * from Coach
select * from Instituteadmin
select * from Sport
select * from institute
select * from Struture
select * from Team
select * from UserRole
select * from Sport
select * from Team_Player where playerId=93
select * from Player_Struture where playerId=167

ALTER TABLE Appuser
ALTER COLUMN userPassword varchar(500);

delete from Appuser
where userId=171

select * 
from institute
where instituteId=13

select * from tempUser
delete from tempUser

update player set playerGender='female' where userId=83

delete from Coach where userId=171

Select * From Appuser Where userEmail='supunmadulal@gmail.com'

insert into UserRole values('ur0001','instiAdmin')
insert into UserRole values('ur0002','Player')
insert into UserRole values('ur0003','Parent')
insert into UserRole values('ur0004','Coach')

insert into Sport values('s0001','Cricket')
insert into Sport values('s0002','Football')
insert into Sport values('s0003','Rugby')

insert into Struture values('str0001','Under 15 Male','Under 15','Male')
insert into Struture values('str0002','Under 15 Female','Under 15','Female')
insert into Struture values('str0003','Under 17 Male','Under 17','Male')
insert into Struture values('str0004','Under 17 Female','Under 17','Female')
insert into Struture values('str0005','Under 19 Male','Under 19','Male')
insert into Struture values('str0006','Under 19 Female','Under 19','Female')

insert into Team values('team1','str0001','s0001',40,8)
insert into Team values('team2','str0002','s0002',62,8)


insert into Coach values(40,'Supun','Madushanka','Tangalle','0705630771','1998-08-22','Male',8)

insert into Team_Player values(1,54)
insert into Team_Player values(1,56)
insert into Team_Player values(2,67)

update Coach
set sportId='s0001'
where userId=40

update Player
set instituteId=8
where userId=56

insert into Appuser values('nishan@gmail.com','11111111','ur0004')

insert into Coach values(62,'nishan','shyamica','ambalantota','012345678','1996-01-01','Male',8,'s0002')

insert into Achievements_Team
values(1,'Tournament 1 finalise')

delete from Achievements_Team
where teamId=1

insert into Player_Struture values(54,'str0001')
insert into Player_Struture values(56,'str0001')
insert into Player_Struture values(67,'str0002')

select * from Player_Fixture pf,Tournament_Team tt,Player p 
where pf.tournamentTeamId=tt.tournamentTeamId AND p.userId=pf.playerId AND tt.tournamentTeamId=12 AND pf.fixtureId=7
order by PFid

update Player_Fixture
set overs=3,givescore=20,wickets=2
where playerID=67