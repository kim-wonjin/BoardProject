import { ArgumentMetadata, BadRequestException, ConsoleLogger, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";
import { BoardsService } from "../boards.service";

export class boardStatusValidationPipe implements PipeTransform {

	readonly StatusOptions = [
		BoardStatus.PUBLIC,
		BoardStatus.PRIVATE
	];

	transform(value: any) {

		value = value.toUpperCase();

		if(!this.ifStatusValid(value)) {
			throw new BadRequestException(`${value}는 status 선택사항에 없습니다.`)
		}

		return value;
	}

	private ifStatusValid(status :any) {
		const index = this.StatusOptions.indexOf(status);
		return index !== -1;
	}
}