# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false,index: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false|
|date|timestamps|null: false|
|user|references|null: false, foreign_key: true|
|message|references|null: false, foreign_key: true|

### Association
has_many :messages
has_many :users, through: :groups_users

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|