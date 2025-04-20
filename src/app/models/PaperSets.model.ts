export class PaperSets {
    id?: number;  
    grade: string;
    category: string;
  
    constructor(
      grade: string, category: string) {
      this.grade = grade;
      this.category = category;
    }
  }
  