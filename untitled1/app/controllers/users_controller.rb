class UsersController < ApplicationController
  before_action :authenticate_user!

  def recipients
    render json: User.all
  end
end