import query from './query';
import db from '../../db';

const userParams = {
  name: 'VARCHAR',
  username: 'VARCHAR',
  email: 'VARCHAR',
  password: 'VARCHAR',
  created_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

const questionParams = {
  user_id: 'INT',
  question_id: 'INT',
  title: 'VARCHAR',
  description: 'TEXT',
  asker: 'VARCHAR',
  views: 'INT',
  posted_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

const answerParams = {
  user_id: 'INT',
  answer_Id: 'INT',
  title: 'VARCHAR',
  description: 'TEXT',
  question_id: 'INT',
  asker: 'VARCHAR',
  views: 'INT',
  posted_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

query(db, 'users', userParams, () => {
  query(db, 'questions', questionParams);
  query(db, 'answers', answerParams);
});
