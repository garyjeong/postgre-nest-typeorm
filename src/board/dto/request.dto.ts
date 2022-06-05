export class CreateBoardRequestDto {
  board_id: string;
  title: string;
  content: string;
  writer: string;
}

export class UpdateBoardRequestDto {
  title: string;
  content: string;
  writer: string;
}
