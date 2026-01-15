# My Budget App Server

Database: Postgresql

## Database 

### Users Schema
```
{
    name: varchar(255), 
    email: varchar(255), 
    created_at: timestamptz
    updated_at: timestamptz 
}
```
### Accounts Schema
```
{

}
```
### Categories Schema
```
{
    
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

