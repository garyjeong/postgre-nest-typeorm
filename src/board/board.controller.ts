import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardRequestDto } from './dto/request.create.dto';
import { BoardResponseDto } from './dto/response.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getBoard(): Promise<BoardResponseDto[]> {
    return await this.boardService.findAll();
  }

  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardRequestDto,
  ): Promise<string> {
    const date = new Date();

    const formatData = (input) => {
      if (input > 9) {
        return input;
      } else return `0${input}`;
    };

    const dateFormat = {
      Y: date.getFullYear(),
      M: formatData(date.getMonth() + 1),
      D: formatData(date.getDate()),
      H: formatData(date.getHours()),
      I: formatData(date.getMinutes()),
      S: formatData(date.getSeconds()),
    };

    createBoardDto.board_id =
      'B' +
      dateFormat.Y +
      dateFormat.M +
      dateFormat.D +
      dateFormat.H +
      dateFormat.I +
      dateFormat.S;
    console.log(dateFormat);
    this.boardService.createBoard(createBoardDto);
    return 'success';
  }
}
