using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace server.Hubs
{
    public class ChatHub : Hub
    {

        private readonly string _systemUserName;
        public ChatHub()
        {
            _systemUserName = "ChatRoom BOT";
        }

        //this method will be called whenever a user submits their name and the room they want to join
        public async Task JoinRoom(UserConnection userConnection)
        {
            //group by connections Id.
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId);
            //the method to receive message will be the "ReceiveMessage" method.
            await Clients.Group(userConnection.RoomId).SendAsync("ReceiveMessage", _systemUserName, $"{userConnection.UserName} has joined {userConnection.RoomId}");
        }
    }
}