class AddColumnConversationIdToUser < ActiveRecord::Migration
  def change
    add_reference :conversations, :user, index: true
  end
end
