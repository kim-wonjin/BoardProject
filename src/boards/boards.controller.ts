import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { boardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService : BoardsService) {}

	
	// @Get('/')
	// getAllBoards(): Board[] {
	// 	return this.boardsService.getAllBoards();
	// }

	// @UsePipes(ValidationPipe)
	// @Post()
	// createBoard(@Body() createBoardDto: createBoardDto): Board {
	// 		return this.boardsService.createBoard(createBoardDto);
	// }

	@Get()
	getAllBoard(): Promise <Board[]> {
		return this.boardsService.getAllBoards();
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: createBoardDto): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number) : Promise <Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id) :Promise<void> {
		return this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')    //id는 파람 status는 바디
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', boardStatusValidationPipe) status: BoardStatus): Promise <Board> {

		return this.boardsService.updateBoardStatus(id, status);
	}

	// @Get('/:id')
	// getBoardById(@Param('id') id: string): Board {
	// 	return this.boardsService.getBoardById(id);
	// }

	// @Delete('/:id')
	// deleteBoard(@Param('id') id: string): void {
	// 	this.boardsService.deleteBoard(id);
	// }

	// @Patch('/:id/status')    //id는 파람 status는 바디
	// updateBoardStatus(
	// 	@Param('id') id: string,
	// 	@Body('status', boardStatusValidationPipe) status: BoardStatus): Board {

	// 	return this.boardsService.updateBoardStatus(id, status);
	// }
	
}
