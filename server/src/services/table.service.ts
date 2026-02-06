import { TableModel } from '../models/Table.model';

export const tableService = {
  async getAll() {
    return TableModel.find({ isActive: true }).sort({ number: 1 }).lean();
  },

  async getById(id: string) {
    return TableModel.findById(id).lean();
  },

  async create(data: { number: number; label: string; seats?: number }) {
    const table = new TableModel(data);
    return table.save();
  },

  async update(id: string, data: { status?: string; label?: string; seats?: number }) {
    return TableModel.findByIdAndUpdate(id, data, { new: true }).lean();
  },
};
