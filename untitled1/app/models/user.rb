class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User
  has_and_belongs_to_many :conversations
  has_many :own_conversations,
           :class_name => 'Conversation'
end
