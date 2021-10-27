import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MusicEntity } from '~/server/entities/MusicEntity';

@Entity('music_category')
export class MusicCategoryEntity {
  @OneToMany(() => MusicEntity, (music) => music.category)
  musics: MusicEntity[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
