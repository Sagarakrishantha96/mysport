import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../_services/chat.service';
import { AdminService } from '../../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { Role } from '../../../_models/role';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private chatService: ChatService, private adminService: AdminService, private _authService: AuthService) { }

  @Input() teamId: number;

  newMessage: string;
  recievedmsg: string;
  messageList: string[] = [];
  name: string
  public userInfo = [];
  test: number
  public institute = [];
  instituteId: number

  currentUser

  saveArray = {
    messageContent: '',
    messageDateTime: '',
    teamId: 0,
    userId: 0,
    instituteId:0,
    userName: '',
    RoleId: ''
  }

  ngOnInit(): void {

    this.currentUser = this._authService.currentUserValue;

    this.chatService
      .getMessage()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });

    this.adminService.getUserInfo(this.currentUser.userId, this.currentUser.RoleId)
      .subscribe((data) => {
        this.userInfo = data;
        if (this.currentUser.RoleId == Role.Admin) {
          this.name = this.userInfo[0].adminFName
        } else if (this.currentUser.RoleId == Role.Player) {
          this.name = this.userInfo[0].playerFName
        } else if (this.currentUser.RoleId == Role.Coach) {
          this.name = this.userInfo[0].coachFName
        }
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this.adminService.getmessages(this.teamId)
      .subscribe((data) => {
        this.messageList = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this.scrollToBottom();

    this.adminService.getInstituteId(this.currentUser.userEmail)
      .subscribe((data) => {
        this.institute = data;
        this.instituteId=this.institute[0]?.instituteId
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.test = 0
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {

    this.saveArray.userId = this.currentUser.userId
    this.saveArray.teamId = this.teamId
    this.saveArray.userName = this.name
    this.saveArray.messageContent = this.newMessage
    this.saveArray.messageDateTime = new Date().toJSON("yyyy/MM/dd HH:mm");
    this.saveArray.RoleId = this.currentUser.RoleId
    this.saveArray.instituteId = this.instituteId

    this.chatService.sendMessage(this.saveArray);
    this.newMessage = '';

    this.adminService.saveMessage(this.saveArray)
      .subscribe(
        response => {
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  showother(id) {
    if (id != this.currentUser.userId) {
      return true
    } else {
      return false
    }
  }

  showme(id) {
    if (id == this.currentUser.userId) {
      return true
    } else {
      return false
    }
  }

  ismyteam(teamId,instituteId) {
    if ((this.teamId == teamId ||teamId == null) && this.instituteId==instituteId) {
      return true
    } else {
      return false
    }
  }

  IsAdmin(RoleId){
    if(RoleId==Role.Admin || RoleId==Role.Coach){
      return true
    }else{
      return false
    }
  }

  isAnnouncment(teamId){
    if(teamId==null){
      return true
    }else{
      return false
    }
  }

}
