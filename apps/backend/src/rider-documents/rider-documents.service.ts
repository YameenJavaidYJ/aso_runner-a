import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@alain/database';
import {
  riderDocuments,
  type RiderDocument,
  type NewRiderDocument,
} from '@alain/database';
import { eq, and, desc } from 'drizzle-orm';
import { CreateRiderDocumentDto } from './dto/create-rider-document.dto';
import { UpdateRiderDocumentDto } from './dto/update-rider-document.dto';

@Injectable()
export class RiderDocumentsService {
  async create(
    createRiderDocumentDto: CreateRiderDocumentDto
  ): Promise<RiderDocument> {
    const [document] = await db
      .insert(riderDocuments)
      .values({
        riderId: createRiderDocumentDto.riderId,
        documentTypeId: createRiderDocumentDto.documentTypeId,
        documentUrl: createRiderDocumentDto.documentUrl,
        status: createRiderDocumentDto.status || 'pending',
        expiryDate: createRiderDocumentDto.expiryDate || null,
      })
      .returning();

    return document;
  }

  async findAll(riderId?: string): Promise<RiderDocument[]> {
    if (riderId) {
      return db
        .select()
        .from(riderDocuments)
        .where(eq(riderDocuments.riderId, riderId))
        .orderBy(desc(riderDocuments.uploadedAt));
    }

    return db
      .select()
      .from(riderDocuments)
      .orderBy(desc(riderDocuments.uploadedAt));
  }

  async findOne(id: string): Promise<RiderDocument> {
    const [document] = await db
      .select()
      .from(riderDocuments)
      .where(eq(riderDocuments.id, id));

    if (!document) {
      throw new NotFoundException(`Rider document with ID ${id} not found`);
    }

    return document;
  }

  async update(
    id: string,
    updateRiderDocumentDto: UpdateRiderDocumentDto
  ): Promise<RiderDocument> {
    const [document] = await db
      .select()
      .from(riderDocuments)
      .where(eq(riderDocuments.id, id));

    if (!document) {
      throw new NotFoundException(`Rider document with ID ${id} not found`);
    }

    const updateData: Partial<NewRiderDocument> = {};

    if (updateRiderDocumentDto.documentUrl !== undefined) {
      updateData.documentUrl = updateRiderDocumentDto.documentUrl;
    }
    if (updateRiderDocumentDto.status !== undefined) {
      updateData.status = updateRiderDocumentDto.status;
      if (updateRiderDocumentDto.status !== 'pending' && !document.reviewedAt) {
        updateData.reviewedAt = new Date();
      }
    }
    if (updateRiderDocumentDto.expiryDate !== undefined) {
      updateData.expiryDate = updateRiderDocumentDto.expiryDate || null;
    }
    if (updateRiderDocumentDto.adminNotes !== undefined) {
      updateData.adminNotes = updateRiderDocumentDto.adminNotes || null;
    }
    if (updateRiderDocumentDto.reviewedBy !== undefined) {
      updateData.reviewedBy = updateRiderDocumentDto.reviewedBy || null;
    }

    const [updatedDocument] = await db
      .update(riderDocuments)
      .set(updateData)
      .where(eq(riderDocuments.id, id))
      .returning();

    return updatedDocument;
  }

  async remove(id: string): Promise<void> {
    const [document] = await db
      .select()
      .from(riderDocuments)
      .where(eq(riderDocuments.id, id));

    if (!document) {
      throw new NotFoundException(`Rider document with ID ${id} not found`);
    }

    await db.delete(riderDocuments).where(eq(riderDocuments.id, id));
  }

  async findByRiderId(riderId: string): Promise<RiderDocument[]> {
    return db
      .select()
      .from(riderDocuments)
      .where(eq(riderDocuments.riderId, riderId))
      .orderBy(desc(riderDocuments.uploadedAt));
  }
}

