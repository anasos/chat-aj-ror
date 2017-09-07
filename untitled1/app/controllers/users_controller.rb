class UsersController < ApplicationController
  before_action :authenticate_user!

  def recipients
    render json: User.all.to_json
  end
end