-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  profile_image_url TEXT,
  bio TEXT,
  skills TEXT [],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  employer_id UUID REFERENCES users(id),
  employee_id UUID REFERENCES users(id),
  bounty DECIMAL(36, 18) NOT NULL,
  currency_address TEXT NOT NULL,
  status TEXT NOT NULL,
  initial_deadline TIMESTAMP WITH TIME ZONE,
  final_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table for AI mediation
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  is_ai BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_ratings table
CREATE TABLE user_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rater_id UUID REFERENCES users(id),
  rated_id UUID REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  rating INT CHECK (
    rating >= 1
    AND rating <= 5
  ),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_connections table
CREATE TABLE user_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  connected_user_id UUID REFERENCES users(id),
  connection_type TEXT,
  -- 'employer' or 'employee'
  last_interaction_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, connected_user_id)
);

-- Create currencies table
CREATE TABLE currencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address TEXT UNIQUE NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  decimals INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_tasks_employer_id ON tasks(employer_id);

CREATE INDEX idx_tasks_employee_id ON tasks(employee_id);

CREATE INDEX idx_messages_task_id ON messages(task_id);

CREATE INDEX idx_user_ratings_rated_id ON user_ratings(rated_id);

CREATE INDEX idx_user_connections_user_id ON user_connections(user_id);