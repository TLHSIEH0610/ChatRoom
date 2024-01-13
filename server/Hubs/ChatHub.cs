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
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _connections = connections;
            _systemUserName = "ChatRoom BOT";
        }

        //this method will be called whenever a user submits their name and the room they want to join
        public async Task JoinRoom(UserConnection userConnection)
        {
            //group by connections Id.
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId);
            _connections[Context.ConnectionId] = userConnection;
            //"ReceiveMessage": the method to receive message and send to frontend(connection.on("ReceiveMessage"))
            await Clients.Group(userConnection.RoomId).SendAsync("ReceiveMessage", _systemUserName, $"{userConnection.UserName} has joined {userConnection.RoomId}");
        }


        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.RoomId).SendAsync("ReceiveMessage", userConnection.UserName, message);
            }

        }
    }
}