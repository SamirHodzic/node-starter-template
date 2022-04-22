import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;
  }