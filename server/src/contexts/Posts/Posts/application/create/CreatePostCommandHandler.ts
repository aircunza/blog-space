import { ICommandHandler } from "../../../../shared/domain/command/ICommandHandler";
import { AuthorId } from "../../domain/value-object/AuthorId";
import { PostContent } from "../../domain/value-object/PostContent";
import { PostId } from "../../domain/value-object/PostId";
import { PostTitle } from "../../domain/value-object/PostTitle";
import { CreatePostCommand } from "./CreatePostCommand";
import { PostCreator } from "./PostCreator";

export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(private readonly postCreator: PostCreator) {}
  subscribedTo() {
    return CreatePostCommand;
  }
  async handle(command: CreatePostCommand): Promise<void> {
    const id = new PostId(command.id);
    const title = new PostTitle(command.title);
    const content = new PostContent(command.content);
    const authorId = new AuthorId(command.authorId);
    await this.postCreator.run({ id, title, content, authorId });
  }
}
