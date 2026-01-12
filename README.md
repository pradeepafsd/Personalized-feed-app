#Personalized Feed App

A full-stack Reddit-style mobile app built with React Native (Expo) and Supabase that allows users to explore a global feed, enjoy a personalized feed based on interests, and create posts with tags.



##Features

Google Sign-In using Supabase Auth
Global Feed: View all posts across the platform
Personalized Feed: Filtered feed based on user interests (tags)
Create Post: Add title, description, and tags
Bookmark & Upvote functionality
Clean and scalable project structure
Fully responsive and visually polished UI



#Tech Stack

Frontend: React Native (Expo)
Backend:	Supabase (Database + Auth)
Styling:	StyleSheet + Icons (Ionicons)
Routing:	expo-router
Optional: Platform-specific styles for mobile/web



#Schema Overview

##Tables  
users – managed by Supabase Auth (Google login)

1. posts

id: UUID

title: Text

description: Text

tags: String[]

author: Text

created_at: Timestamp

2. upvotes

user_id: UUID

post_id: UUID

3. bookmarks

user_id: UUID

post_id: UUID



#Personalization Logic

The personalized feed filters posts based on the tags that match the current user's previous interactions (i.e., tags from posts they upvoted/bookmarked or followed manually).

##Logic:

Fetch tags from user activity (upvotes/bookmarks).

Filter posts where post.tags includes any of those tags.

Fallback to latest posts if not enough matches.

This makes the feed user-centric, lightweight, and easily extendable.


#How to Run Locally

git clone https://github.com/pradeepafsd/personalized-feed-app.git
cd personalized-feed-app
npm install
npx expo start


Create a project in Supabase  
Set up the schema and insert dummy data (see /supabase/schema.sql if included)  
Add .env with your Supabase URL and anon/public key:

SUPABASE_URL=my-url  
SUPABASE_ANON_KEY=my-key  


#Final Product Thinking
If you had to scale this app to 1 million users in India, what would you change, prioritize, or redesign?

- Move personalization logic to Supabase Edge Functions to improve scalability and reduce client processing.
- Implement pagination and lazy loading in global/personalized feed for performance.
- Add real-time listeners for upvotes/bookmarks to sync state across devices.
- Use Supabase Row-Level Security (RLS) for secure, multi-user access and permissions.
- Optimize data queries with indexes and filtering to handle large-scale post/tag relationships efficiently.

