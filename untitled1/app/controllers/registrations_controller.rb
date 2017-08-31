class RegistrationsController < Devise::RegistrationsController
  # before_action :authenticate, only: [:update_password]
  def new
    super
  end
end