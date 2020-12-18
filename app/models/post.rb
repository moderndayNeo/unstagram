class Post < ApplicationRecord
  has_one_attached :photo

  validates :author_id, presence: true
  validates :caption, length: { maximum: 2200 }

  validate :has_photo_attached
  scope :with_eager_loaded_photo, -> {eager_load(photo_attachment: :blob)}

  belongs_to :author,
             class_name: :User,
             foreign_key: :author_id

  has_many :likes, as: :likeable, dependent: :destroy

  has_many :likers,
    through: :likes,
    source: :liker

  has_many :comments,
           class_name: :Comment,
           foreign_key: :post_id,
           dependent: :destroy

  # has_many :taggings,
  #          class_name: :Tagging,
  #          foreign_key: :post_id,
  #          dependent: :destroy

  # has_many :hashtags, through: :taggings, source: :hashtag

  private

  def has_photo_attached
    if !self.photo.attached?
      errors[:post] << "must have a photo attached"
    end
  end

  def author_username
    self.author.username
  end

  def self.associated_users(posts)
    associated_users = []

    posts.each do |post|
      associated_users << post.author
    end

    return associated_users
  end
end
