import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { boardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard()) // 유저 인증 관련 미들웨어 (jwt토큰이 있어야 기능수행) , Req 시 User정보 같이 넘겨줌
export class BoardsController {
	constructor(private boardsService : BoardsService) {}

	@Get()
	getAllBoard(): Promise <Board[]> {
		return this.boardsService.getAllBoards();
	}

	//토큰정보의 유저가 생성한 게시물만 조회
	@Get('/user')
	getUserBoard(@GetUser() user: User): Promise <Board[]> {
		return this.boardsService.getUserBoards(user);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: createBoardDto, 
	@GetUser() user: User): Promise<Board> { // 유저 정보 같이 넘기기
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number) : Promise <Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id,
	@GetUser() user: User) :Promise<void> {
		return this.boardsService.deleteBoard(id, user);
	}

	@Patch('/:id/status')  //id는 파람 status는 바디
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', boardStatusValidationPipe) status: BoardStatus): Promise <Board> {

		return this.boardsService.updateBoardStatus(id, status);
	}
	
}
