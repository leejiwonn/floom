import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MusicCategoryEntity } from '~/server/entities/MusicCategoryEntity';

@Entity('music')
export class MusicEntity {
  @ManyToOne(() => MusicCategoryEntity, (category) => category.musics)
  category: MusicCategoryEntity;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  url: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
