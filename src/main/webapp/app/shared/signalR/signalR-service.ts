// src/app/shared/signalRService.ts
import * as signalR from "@microsoft/signalr";

const SERVER_URL = "https://localhost:44338/orderHub"; // Đổi thành API của bạn
const connection = new signalR.HubConnectionBuilder()
  .withUrl(SERVER_URL, { withCredentials: false }) // Nếu có token auth, thêm { accessTokenFactory: () => "TOKEN" }
  .withAutomaticReconnect([0, 2000, 5000, 10000]) // Tự động reconnect
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const startSignalRConnection = async () => {
  try {
    await connection.start();
    console.log("SignalR connected!");
  } catch (error) {
    console.error("SignalR connection error:", error);
  }
};

export const getSignalRConnection = () => connection;
