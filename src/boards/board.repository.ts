import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { createBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board)   // typeorm 0.2v 으로 다운그레이드 했음
export class BoardRepository extends Repository<Board> {

	async createBoard(createBoardDto: createBoardDto, user: User) : Promise <Board> {
		const {title, description} = createBoardDto;
			const board = this.create({
				title,
				description,
				status: BoardStatus.PUBLIC,
				user
			});
			await this.save(board);
			return board;
	}
}