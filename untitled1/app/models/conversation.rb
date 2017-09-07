class Conversation < ActiveRecord::Base
  has_many :messages
  has_and_belongs_to_many :recipients,
                  :class_name => 'User',
                  :join_table => 'conversations_users',
                  :foreign_key => 'conversation_id',
                  :association_foreign_key => 'user_id'
  belongs_to :owner, class_name: 'User', :foreign_key => 'user_id'
end
