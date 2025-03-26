export class ModelPaper {
    modelPaperId?: number;
    grade: string;
    category: string;
    paperNo: string;
    partNo: string;
  
    constructor(grade: string, category: string, paperNo: string, partNo: string) {
      this.grade = grade;
      this.category = category;
      this.paperNo = paperNo;
      this.partNo = partNo;
    }
  }
  