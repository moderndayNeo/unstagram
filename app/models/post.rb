class Post < ApplicationRecord
  has_one_attached :photo

  validates :author_id, presence: true
  validates :caption, length: { maximum: 2200 }
#   validates :photo, attached: true

  belongs_to :author,
             class_name: :User,
             foreign_key: :author_id

  # has_many :likes, as: :likeable

  # has_many :comments,
  #          class_name: :Comment,
  #          foreign_key: :post_id,
  #          dependent: :destroy

  # has_many :taggings,
  #          class_name: :Tagging,
  #          foreign_key: :post_id,
  #          dependent: :destroy

  # has_many :hashtags, through: :taggings, source: :hashtag

  def author_username
    self.author.username
  end
end