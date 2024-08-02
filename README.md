# Backend test project

## Requirements

Write the twitter clone API.

- User can register with username and password.
- API will require JWT token to authorize.
- User can tweet a message which no longer than 200 characters.
- User can follow other user and the message from other user will be included in the user’s feed with the latest time ordered.

## Endpoints

| **User**            |                                           |
| ------------------- | ----------------------------------------- |
| /register           | Register the new user                     |
| /login              | Login                                     |
| /logout             | Logout                                    |
| /follow/[user_id]   | Follow other user                         |
| /unfollow/[user_id] | Unfollow a user                           |
| **Feed**            |                                           |
| /feed               | Get the message feed for the current user |
| /tweet              | Create new tweet                          |

## Instruction

Fork this repository, do the work, push the code and alert hr@smilefokus.com when you done. The instruction to run the code is required.

Testing is optional but the team will be very happy if you have it :)

Use NodeJS and MongoDB with any framework or just plain javascript or typescript OR! if you have strong opinion on the infrastructure choice do not hesitate to present to us.

Any question plese contact hr@smilefokus.com

Happy Coding :)
