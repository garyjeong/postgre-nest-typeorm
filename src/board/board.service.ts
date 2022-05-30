import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateBoardRequestDto,
  UpdateBoardRequestDto,
} from './dto/request.dto';
import { Board } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne({ board_id: id });
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardRequestDto): void {
    this.boardRepository.save(createBoardDto);
  }

  updateBoard(id: string, updateBoardDto: UpdateBoardRequestDto): void {
    this.boardRepository.update(+id, updateBoardDto);
  }

  deleteBoard(id: string): void {
    this.boardRepository.delete(id);
  }
}
