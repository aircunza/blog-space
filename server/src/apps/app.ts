import { configApps } from "../config";
import { IEventBus } from "../contexts/shared/domain/event/IEventBus";
import { DomainEventSubscribers } from "../contexts/shared/infrastructure/EventBus/DomainEventSubscribers";
import { container } from "./posts/dependency-injection";
import { Server } from "./server";

export class AppBackend {
  server?: Server;
  addSocketIo?: boolean | undefined;
  constructor(
    { addSocketIo }: { addSocketIo: boolean | undefined } = {
      addSocketIo: false,
    }
  ) {
    this.addSocketIo = addSocketIo;
  }

  async start() {
    this.server = new Server(configApps.port, this.addSocketIo);
    await this.configureEventBus();
    return this.server.listen();
  }

  async stop() {
    this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }

  get appServer() {
    return this.server?.getApp();
  }

  private async configureEventBus() {
    const eventBus = container.get<IEventBus>(
      "Contexts.shared.infrastructure.EventBus"
    );
    const domainEventSubscribers = container.get<DomainEventSubscribers>(
      "Contexts.posts.application.create.DomainEventSubscribers"
    );
    eventBus.addSubscribers(domainEventSubscribers.items);
  }
}
