class ConversationsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    conversation = Conversation.create!(conversation_params)
    if conversation
      conversation.update(user_id: current_user.id)
      render json: { status: 200, conversation: conversation }, status: 200
    else
      render json: { status: 400 }, status: 200
    end
  end

  def list
    render json: { conversations: Conversation.all, belongs_conversations: current_user.conversations }
  end

  def update
    conversation = Conversation.find(params[:id])
    if conversation.update!(conversation_params)
      render json: conversation, status: 200
    end
  end

  def show
    conversation = Conversation.find(params[:id])
    render json: conversation.messages.to_json, status: 200
  end

  private

  def conversation_params
    params.require(:conversation).permit(:subject, :recipient_ids => [])
  end
end
