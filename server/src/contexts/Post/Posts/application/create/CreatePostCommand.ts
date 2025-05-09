import { Command } from "../../../shared/domain/command/Command";

interface params {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export class CreatePostCommand extends Command {
  id: string;
  title: string;
  content: string;
  authorId: string;
  constructor({ id, title, content, authorId }: params) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
