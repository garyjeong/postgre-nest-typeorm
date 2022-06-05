import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import {
  CreateBoardRequestDto,
  UpdateBoardRequestDto,
} from './dto/request.dto';
import { BoardResponseDto } from './dto/response.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async getBoard(@Param('id') id: string): Promise<BoardResponseDto> {
    const result = await this.boardService.findOne(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get()
  async getBoardAll(): Promise<BoardResponseDto[]> {
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
      MS: formatData(date.getMilliseconds()),
    };

    createBoardDto.board_id =
      'B' +
      dateFormat.Y +
      dateFormat.M +
      dateFormat.D +
      dateFormat.H +
      dateFormat.I +
      dateFormat.S +
      dateFormat.MS;

    this.boardService.createBoard(createBoardDto);
    return 'success';
  }

  @Put(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardRequestDto,
  ): Promise<string> {
    const exist = await this.boardService.countToId(id);
    // console.log(exist);
    if (!exist) {
      throw new NotFoundException();
    }
    this.boardService.updateBoard(id, updateBoardDto);
    return 'success';
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<string> {
    this.boardService.deleteBoard(id);
    return 'success';
  }
}
