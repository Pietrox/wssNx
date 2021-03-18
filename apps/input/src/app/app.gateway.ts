import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';


@WebSocketGateway(Number(process.env.WEBSOCKET_PORT))
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss;
  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Websocket on');
  }

  handleConnection(client) {
    this.logger.log(`Connected ${client.id}`);
  }

  handleDisconnect(client) {
    this.logger.log(`Disconnected ${client.id}`);
  }
}
