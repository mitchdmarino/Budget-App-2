# My Budget App Server

Database: Postgresql

## Database 

### Users Schema
```
{
    id: uuid (primary key) 
    name: varchar(255), 
    email: varchar(255), 
    created_at: timestamptz
    updated_at: timestamptz 
}
```
### Accounts Schema
```
{
    id: uuid (primary key) 
    user_id: uuid (foreign key) 
    name: varchar(100)
    created_at: timestamptz
    updated_at: timestamptz 
}
```
### Categories Schema
```
{
    id: uuid (primary key) 
    user_id: uuid (foreign key) 
    name: varchar(100)
    color: varchar(7)
    created_at: timestamptz
    updated_at: timestamptz 
}
```
### Transactions Schema
```
{
    
}
```

## API  

### /users 
| Method | Path       | Description | Body | Notes |
| ------ | ---------- | ----------- | --- | --- | 
| POST | / | Creates a user | name, email | 
| GET | / | Gets all users | | admin only |
| GET | /:userId | Gets a specific user | | admin only |
| PUT | /:userId | Updates a specific user | | admin only |
| DELETE | /:userId | Deletes a user | | admin only |

### /auth
| Method | Path | Description | Body | Notes |
| ------ | ---------- | ----------- | --- | --- | 
| POST | /register | Registers a new user and returns a JWT token | name, email| | 

### /accounts 
| Method | Path       | Description | Body | Notes |
| ------ | ---------- | ----------- | --- | --- | 


### /categories 
| Method | Path       | Description | Body | Notes |
| ------ | ---------- | ----------- | --- | --- | 

### /transactions 
| Method | Path       | Description | Body | Notes |
| ------ | ---------- | ----------- | --- | --- | 

## Important Commands 

To create migration files with pg-migrate :  
> npx node-pg-migrate create [migration name] --migration-file-language ts
To migrate: 
> npm run build 
> npm run migrate:up

