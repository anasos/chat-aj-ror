class TopicController < ApplicationController
  def index
  end

  def list
    topics = []
    topics <<
      {
          "price": 13,
          "id": "motorola-defy-with-motoblur",
          "name": "Motorola DEFY u2122 with MOTOBLUR u2122",
          "snippet": "Are you ready for everything life throws your way?"
      }
    topics <<
        {
            "price": 75,
            "id": "nexus-defy-with-motoblur",
            "name": "Nexus DEFYu2122 with MOTOBLURu2122",
            "snippet": "Are you ready for everything life throws your way?"
        }
    topics <<
        {
            "price": 25,
            "id": "nokia-defy-with-motoblur",
            "name": "Nokia DEFYu2122 with MOTOBLURu2122",
            "snippet": "Are you ready for everything life throws your way?"
        }
    render json: topics.to_json
  end

  def show
    topics = []
    topics <<
        {
            "price": 13,
            "id": "motorola-defy-with-motoblur",
            "name": "Motorola DEFY u2122 with MOTOBLUR u2122",
            "snippet": "Are you ready for everything life throws your way?",
            "images": [
                "https://s-media-cache-ak0.pinimg.com/736x/33/b8/69/33b869f90619e81763dbf1fccc896d8d--lion-logo-modern-logo.jpg",
                "https://s-media-cache-ak0.pinimg.com/736x/c1/09/73/c10973a2554dcebd540db0bd62066c62--origami-lion-lion-logo.jpg",
                "https://s-media-cache-ak0.pinimg.com/736x/41/1a/48/411a4835d38ff899e55ce2802b08329c.jpg"
            ]
        }
    topics <<
        {
            "price": 75,
            "id": "nexus-defy-with-motoblur",
            "name": "Nexus DEFYu2122 with MOTOBLURu2122",
            "snippet": "Are you ready for everything life throws your way?"
        }
    topics <<
        {
            "price": 25,
            "id": "nokia-defy-with-motoblur",
            "name": "Nokia DEFYu2122 with MOTOBLURu2122",
            "snippet": "Are you ready for everything life throws your way?"
        }
    render json: topics[params[:topic_id].to_i].to_json
  end

  def create
    topic = {
        "price": 13,
        "id": "motorola-defy-with-motoblur",
        "name": "Motorola DEFY u2122 with MOTOBLUR u2122",
        "snippet": "Are you ready for everything life throws your way?",
        "images": [
            "https://s-media-cache-ak0.pinimg.com/736x/33/b8/69/33b869f90619e81763dbf1fccc896d8d--lion-logo-modern-logo.jpg",
            "https://s-media-cache-ak0.pinimg.com/736x/c1/09/73/c10973a2554dcebd540db0bd62066c62--origami-lion-lion-logo.jpg",
            "https://s-media-cache-ak0.pinimg.com/736x/41/1a/48/411a4835d38ff899e55ce2802b08329c.jpg"
        ]
    }
    render json: topic.to_json
  end
end
