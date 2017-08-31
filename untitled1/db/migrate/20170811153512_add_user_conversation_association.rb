class AddUserConversationAssociation < ActiveRecord::Migration
  def change
    create_table :conversations_users, id: false do |t|
      t.belongs_to :conversation
      t.belongs_to :user
    end
  end
end
