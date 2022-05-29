import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardRequestDto } from './dto/request.create.dto';
import { Board } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardRequestDto): void {
    this.boardRepository.save(createBoardDto);
  }
}
