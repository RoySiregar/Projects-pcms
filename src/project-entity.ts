import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string; 

  @Column()
  clientName: string;

  @Column({ default: 0 })
  progressPercentage: number;

  @Column({ default: 'In Progress' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}