import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}

	@Post('/signup')
	signUp(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto): Promise<void> {
		return this.authService.signUp(authcredentialDto);
	}

	@Post('/signIn')
	signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise <{accessToken : string}> {
		return this.authService.signIn(authCredentialDto);
	}

	@Post('/test')
	@UseGuards(AuthGuard())  // req안에 유저 정보를 넣을 수 있다. (제일 먼저 처리되는 미들웨어)
	test(@GetUser() user: User) {  // @GetUser 커스텀 데코레이터로 유저 정보만 가져옴
		console.log('user', user);
	}
}
