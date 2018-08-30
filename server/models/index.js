import query from './query';
import db from '../db';

const usersColumn = {
  name: 'VARCHAR',
  username: 'VARCHAR',
  email: 'VARCHAR',
  password: 'VARCHAR',
  created_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}  

const questionsColumn = {
  user_id: 'INT',
  title: 'VARCHAR',
  description: 'TEXT',
  respondent: 'VARCHAR',
  views: 'INT DEFAULT 0',
  posted_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

const answersColumn = {
  user_id: 'INT',
  username: 'VARCHAR',
  answer: 'TEXT',
  question_id: 'INT',
  is_prefered: 'BOOLEAN DEFAULT false',
  views: 'INT DEFAULT 0',
  upvotes: 'INT DEFAULT 0',
  downvotes: 'INT DEFAULT 0',
  posted_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

query(db, 'users', usersColumn, () => {
  query(db, 'questions', questionsColumn);
  query(db, 'answers', answersColumn);
});
