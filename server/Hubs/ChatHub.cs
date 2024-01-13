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
        private readonly string _receiveMessageMethod;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _connections = connections;
            _systemUserName = "ChatRoom BOT";
            _receiveMessageMethod = "ReceiveMessage";
        }

        //this method will be called whenever a user submits their name and the room they want to join
        public async Task JoinRoom(UserConnection userConnection)
        {
            //group by connections Id.
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.RoomId);
            _connections[Context.ConnectionId] = userConnection;
            //"ReceiveMessage": the method to receive message and send to frontend(connection.on("ReceiveMessage"))
            await Clients.Group(userConnection.RoomId).SendAsync(_receiveMessageMethod, _systemUserName, $"{userConnection.UserName} has joined {userConnection.RoomId}");
            await SendConnectedUser(userConnection.RoomId);
        }


        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.RoomId).SendAsync(_receiveMessageMethod, userConnection.UserName, message);
            }

        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                Console.WriteLine("user disconnect");
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.RoomId).SendAsync(_receiveMessageMethod, _systemUserName, $"{userConnection.UserName} has left");
                SendConnectedUser(userConnection.RoomId);

            }

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendConnectedUser(string roomId)
        {
            var users = _connections.Values.Where(c => c.RoomId == roomId).Select(c => c.UserName);

            return Clients.Group(roomId).SendAsync("UserList", users);
        }
    }
}