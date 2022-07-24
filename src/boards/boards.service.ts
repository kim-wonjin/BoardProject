import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { stat } from 'fs';
import { User } from 'src/auth/user.entity';
import { QueryBuilder } from 'typeorm';

@Injectable()
export class BoardsService {

	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
		) {}

		async getAllBoards():Promise <Board[]> {
			return this.boardRepository.find();
		}

		// QueryBuilder 사용 
		async getUserBoards(user: User): Promise <Board[]> {

			const query = this.boardRepository.createQueryBuilder('board'); // board 테이블에서 쿼리 생성

			query.where('board.userId = :userId', {userId: user.id});

			const boards = await query.getMany();

			return boards;
		}

		createBoard(createBoardDto: createBoardDto, user: User): Promise <Board> {
			return this.boardRepository.createBoard(createBoardDto, user);

		}

		async getBoardById(id: number): Promise <Board> {
			const found = await this.boardRepository.findOne(id);

			if (!found) {
				throw new NotFoundException(`Can't find Board with id ${id}`);
			}
			return found;
		}

		async deleteBoard(id: number, user: User): Promise<void> {
			//user 정보도 파라미터로 넘겨서 생성한 유저만 삭제할 수 있도록 
			const result = await this.boardRepository.delete({id, user});
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

	
	
}
