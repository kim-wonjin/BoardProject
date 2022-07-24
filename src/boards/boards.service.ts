import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { stat } from 'fs';

@Injectable()
export class BoardsService {

	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
		) {}
	
	
		// private boards: Board[] = []; // 보드 내용을 담을 배열


		// getAllBoards(): Board[] {
		// 	return this.boards;
		// }

		// createBoard(createBoardDto: createBoardDto) {

		// 	const {title, description} = createBoardDto;

		// 	const board: Board = {
		// 		id: uuid(),
		// 		title,
		// 		description,
		// 		status: BoardStatus.PUBLIC
		// 	}
		// 	this.boards.push(board);
		// 	return board;
		// }

		async getAllBoards():Promise <Board[]> {
			return this.boardRepository.find();
		}

		createBoard(createBoardDto: createBoardDto): Promise <Board> {
			return this.boardRepository.createBoard(createBoardDto);

		}

		async getBoardById(id: number): Promise <Board> {
			const found = await this.boardRepository.findOne(id);

			if (!found) {
				throw new NotFoundException(`Can't find Board with id ${id}`);
			}
			return found;
		}

		async deleteBoard(id: number): Promise<void> {
			const result = await this.boardRepository.delete(id);
			if (result.affected === 0) {
				throw new NotFoundException(`Can't find board with id ${id}`);
			}
		}

		async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
			const board = await this.getBoardById(id);
			board.status = status;
			await this.boardRepository.save(board);

			return board;

		}

		// getBoardById(id: string): Board {
			
		// 	const found = this.boards.find((board) => board.id === id);
		// 	if (!found) {
		// 		throw new NotFoundException(`${id}의 결과를 찾을 수 없습니다`);
		// 	}
		// 	return found;
		// }

		// deleteBoard(id: string): void {
		// 	const found = this.getBoardById(id);
		// 	this.boards = this.boards.filter((board) => board.id !== found.id);
		// }

		// updateBoardStatus(id: string, status: BoardStatus): Board {
		// 	const board = this.getBoardById(id);
		// 	board.status = status;
		// 	return board;
		// }
	
}
