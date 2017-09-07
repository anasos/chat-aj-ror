class MessagesController < ApplicationController

  def create
    message = Message.new
    if message.update(message_params)
      message.update(user_id: current_user.id)
      render json: message, status: 200
    else
      render json: {}, status: 400
    end
  end

  protected

  def message_params
    params.require(:message).permit(:content, :conversation_id)
  end

end