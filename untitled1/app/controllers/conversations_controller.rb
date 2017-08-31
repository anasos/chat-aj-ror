class ConversationsController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def create
    if Conversation.create!(conversation_params)
      render json: { status: 200 }, status: 200
    else
      render json: { status: 400 }, status: 200
    end
  end

  def list
    render json: Conversation.all.to_json
  end

  def update
    conversation = Conversation.find(params[:id])
    if conversation.update!(conversation_params)
      render json: conversation, status: 200
    end
  end

  def show
    conversation = Conversation.find(params[:id])
    render json: conversation.messages, status: 200
  end

  private

  def conversation_params
    params.require(:conversation).permit(:subject)
  end
end
