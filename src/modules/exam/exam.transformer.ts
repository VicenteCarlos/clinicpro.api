import { Injectable } from '@nestjs/common';
import { Exam } from './exam.entity';

@Injectable()
export class ExamTransformer {
  async item(exam: any) {
    return {
      id: exam.id,
      name: exam.name,
      type: exam.type,
      category: exam.category,
      requestDate: exam.requestDate,
      observations: exam.observations,
      results: exam.results,
      status: exam.status,
      notes: exam.notes,
      professionalId: exam.professionalId,
      patientId: exam.patientId,
      clinicId: exam.clinicId,
    };
  }

  async collection(exams: any[]) {
    return await Promise.all(exams.map(async (exam) => await this.item(exam.dataValues)));
  }
}
